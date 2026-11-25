"use client";

import { useEffect } from "react";

// Site-wide typography rule: no single word left alone on a line.
//  1. The last two words of every text block are glued (see GLUE), so a paragraph or heading never ends on a lone word.
//  2. The first two words of every sentence inside a block are joined, so a
//     sentence's opening word never hangs at the end of the line above while
//     the rest of the sentence starts below.
// Runs after hydration (so server and client HTML match) and again whenever
// the DOM changes (route changes, accordions, CMS content). Rewrites are
// idempotent: a second pass finds nothing to change, so the observer settles.
// Opt out for an element and its children with data-no-typography.

// Glue between two words that must stay on one line: U+00A0 (no-break
// space). Houschka Pro, the heading font, draws U+00A0 about 2.3x wider than a
// normal space; app/font.css overrides that one character so it renders at
// normal space width. Do not swap in "space + U+2060 word joiner": Chrome
// still breaks at that space.
const WJ = "\u2060";
const GLUE = "\u00A0";
const SKIP = "script,style,noscript,textarea,input,select,code,pre,svg,[contenteditable],[data-no-typography]";
// Fewer words than this and the block is left alone: joining the last two
// words of a two-word heading would make it unbreakable on narrow screens.
const MIN_WORDS = 3;
// Hyphen between two letters/digits with no word joiner after it yet.
const HYPHEN_IN_WORD = /([\p{L}\p{N}])-(?=[\p{L}\p{N}])/gu;
// Sentence end (. ! ?), optional closing quote/bracket, whitespace, then the
// next sentence's first word (group 2) and the gap after it (group 3).
const SENTENCE_START = /([.!?]["'’”)]?\s+)(\S+)(\s+)(?=\S)/g;

// Heading highlight spans are inline-block below lg (globals.css) so the phrase
// never splits across lines; they still count as inline text here, otherwise
// the heading's words around them would be glued as if the phrase were absent.
const HEADING_SPAN = "h1 span, h2 span, h3 span, h4 span";

const isInlineDisplay = (el) => {
    const d = getComputedStyle(el).display;
    return d === "inline" || d === "contents" || (d === "inline-block" && el.matches(HEADING_SPAN));
};

// Nearest ancestor that lays out its own lines.
const blockOf = (node) => {
    let el = node.parentElement;
    while (el && el !== document.body && isInlineDisplay(el)) el = el.parentElement;
    return el;
};

const textNodesOf = (block) => {
    const out = [];
    const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
            const p = n.parentElement;
            if (!p || p.closest(SKIP)) return NodeFilter.FILTER_REJECT;
            // Whitespace-only nodes are kept: they can be the gap between the
            // last two words (see fixBlock step 2).
            return blockOf(n) === block ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
    });
    while (walker.nextNode()) out.push(walker.currentNode);
    return out;
};

let changes = 0;
const setText = (node, value) => {
    if (node.nodeValue !== value) {
        node.nodeValue = value;
        changes++;
    }
};

// Server HTML inside a Suspense boundary (every page here, via loading.tsx)
// hydrates after this component's effect. Editing that text first makes React
// report a hydration mismatch, so only touch text whose element React has
// already claimed; content injected with dangerouslySetInnerHTML (blog/CMS
// bodies) never gets claimed, so it is allowed once its host element is.
const hasFiber = (el) => Object.keys(el).some((k) => k.startsWith("__reactFiber$"));
const hasHtmlProp = (el) => {
    const key = Object.keys(el).find((k) => k.startsWith("__reactProps$"));
    return Boolean(key && el[key]?.dangerouslySetInnerHTML);
};
const isHydrated = (el) => {
    if (hasFiber(el)) return true;
    for (let a = el.parentElement; a; a = a.parentElement) {
        if (hasFiber(a)) return hasHtmlProp(a);
    }
    return false;
};

let deferred = false;

function fixBlock(block) {
    if (!block || block === document.body || block.closest(SKIP)) return;
    const nodes = textNodesOf(block);
    if (!nodes.length) return;
    if (!nodes.every((n) => isHydrated(n.parentElement))) {
        deferred = true;
        return;
    }

    // 1. Hyphenated words ("plant-floor", "real-time") kept whole instead of
    //    splitting at the hyphen across two lines.
    for (const n of nodes) setText(n, n.nodeValue.replace(HYPHEN_IN_WORD, `$1-${WJ}`));

    // 2. Gaps to glue, found on the block's whole text because a gap can be
    //    split over several text nodes (`and{" "}<span>Why</span>` gives "and",
    //    " ", "Why"). Each gap, across every node it touches, becomes exactly
    //    one GLUE; replacing only one space would show a double space.
    const full = nodes.map((n) => n.nodeValue).join("");
    const gaps = [];
    //    a. A sentence's first word joined to its second.
    for (const m of full.matchAll(SENTENCE_START)) {
        const end = m.index + m[0].length;
        gaps.push([end - m[3].length, end]);
    }
    //    b. The last two words of the block.
    if (full.trim().split(/\s+/).length >= MIN_WORDS) {
        let wordStart = full.trimEnd().length;
        while (wordStart > 0 && !/\s/.test(full[wordStart - 1])) wordStart--;
        let gapStart = wordStart;
        while (gapStart > 0 && /\s/.test(full[gapStart - 1])) gapStart--;
        if (gapStart > 0) gaps.push([gapStart, wordStart]);
    }
    // Right to left, so earlier offsets stay valid as text lengths change.
    gaps.sort((a, b) => b[0] - a[0]);
    let last = Infinity;
    for (const [from, to] of gaps) {
        if (to > last || full.slice(from, to) === GLUE) continue;
        glueGap(nodes, from, to);
        last = from;
    }
}

function glueGap(nodes, gapStart, gapEnd) {
    let pos = 0;
    let placed = false;
    for (const n of nodes) {
        const v = n.nodeValue;
        const from = Math.max(gapStart - pos, 0);
        const to = Math.min(gapEnd - pos, v.length);
        pos += v.length;
        if (from >= to) continue;
        setText(n, v.slice(0, from) + (placed ? "" : GLUE) + v.slice(to));
        placed = true;
    }
}

function fixTree(root) {
    const blocks = new Set();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const n = walker.currentNode;
        if (n.nodeValue.trim()) blocks.add(blockOf(n));
    }
    blocks.forEach(fixBlock);
}

export default function TypographyGuard() {
    useEffect(() => {
        let pending = new Set();
        let frame = 0;
        const flush = () => {
            frame = 0;
            const roots = pending;
            pending = new Set();
            roots.forEach((r) => r.isConnected && fixTree(r));
        };
        const schedule = (root) => {
            pending.add(root);
            if (!frame) frame = requestAnimationFrame(flush);
        };

        // React hydrates in slices and can write server text back after a
        // pass, and claiming produces no DOM mutation to observe. So sweep the
        // whole page on a short timer until it has been stable for a while.
        const started = performance.now();
        let sweeps = 0;
        let quiet = 0;
        let timer = 0;
        const sweep = () => {
            timer = 0;
            deferred = false;
            const before = changes;
            fixTree(document.body);
            quiet = changes === before && !deferred ? quiet + 1 : 0;
            sweeps++;
            const settled = quiet >= 3 && performance.now() - started > 4000;
            if (!settled && sweeps < 40) timer = window.setTimeout(sweep, 400);
        };
        sweep();
        const observer = new MutationObserver((records) => {
            for (const r of records) {
                const target = r.type === "characterData" ? r.target.parentElement : r.target;
                if (!target) continue;
                // Re-run on the whole block so the last-word rule sees all of it.
                const block = target.nodeType === 1 && !isInlineDisplay(target) ? target : blockOf(target.firstChild || target);
                if (block) schedule(block);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
        return () => {
            observer.disconnect();
            if (frame) cancelAnimationFrame(frame);
            if (timer) clearTimeout(timer);
        };
    }, []);

    return null;
}
