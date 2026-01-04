import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Translation Docs" },
        {
            name: "description",
            content: "Documentation for translation features",
        },
    ];
}

export default function Home() {
    return (
        <main className="px-8 mt-28">
            <section>
                <h2 className="capitalize text-2xl font-bold">
                    Translate your documents
                </h2>
                <p className="mt-4 text-neutral-600">
                    Upload documents in PDF, DOCX, TXT formats and translate
                    them into 50+ languages
                </p>
            </section>
        </main>
    );
}
