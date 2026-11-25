import PageClient from "./PageClient";

export const metadata = {
    alternates: { canonical: "/" },
    title: { absolute: "Ascendus | Enterprise SAP & IT Consulting" },
    description: "Ascendus designs, builds and runs enterprise technology — SAP, cloud, data, AI, security and managed operations — under one team.",
};

export default function Page() {
    return <PageClient />;
}
