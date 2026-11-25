"use client";

// Phone navigation for the tab-list + panel sections (From Hire to Retire, How a
// Migration Runs, Key Benefits of ERP Migration, ...). Below sm the tab list is
// hidden and these white dots sit centred near the foot of the panel, under all
// the copy, kept quiet so the copy leads: 6px dots at 25% white, the active one
// a 16px pill at 70%. Each dot has a 32px tap area. The panel reserves room for
// them with bottom padding on its phone sizer (pb-[72px] on the navy panels).
export default function PhoneTabDots({ labels, active, onSelect, className = "bottom-2" }) {
    return (
        <div className={`sm:hidden absolute inset-x-0 z-10 flex items-center justify-center ${className}`}>
            {labels.map((label, index) => (
                <button
                    key={label}
                    type="button"
                    onClick={() => onSelect(index)}
                    aria-label={`Show ${label}`}
                    aria-current={index === active ? "true" : undefined}
                    className="flex h-8 items-center px-2"
                >
                    <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ease-out ${index === active ? "w-4 bg-white/70" : "w-1.5 bg-white/25"}`}
                    />
                </button>
            ))}
        </div>
    );
}

// Props for the panel's motion.div: a horizontal swipe of 40px or more moves to
// the next (left) or previous (right) tab; vertical page scrolling still works.
export function phoneSwipeProps(go) {
    return {
        onPanEnd: (_, info) => {
            const { x, y } = info.offset;
            if (Math.abs(x) < 40 || Math.abs(x) < Math.abs(y)) return;
            go(x < 0 ? 1 : -1);
        },
        style: { touchAction: "pan-y" },
    };
}
