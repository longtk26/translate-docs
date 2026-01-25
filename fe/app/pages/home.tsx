import { Link } from "react-router";
import type { Route } from "./+types/home";
import {
    ArrowRight,
    Upload,
    Languages,
    Shield,
    Zap,
    Users,
    Globe,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "TranslateDocs - Professional Document Translation" },
        {
            name: "description",
            content:
                "Translate your documents to 50+ languages with AI-powered translation. Fast, accurate, and secure.",
        },
    ];
}

export default function Home() {
    const features = [
        {
            icon: Upload,
            title: "Easy Upload",
            description:
                "Drag and drop your documents. Support for PDF, DOCX, TXT, and more.",
        },
        {
            icon: Languages,
            title: "50+ Languages",
            description:
                "Translate to and from over 50 languages with high accuracy.",
        },
        {
            icon: Zap,
            title: "Fast Processing",
            description:
                "Get your translations in minutes with our optimized engine.",
        },
        {
            icon: Shield,
            title: "Secure & Private",
            description:
                "Your documents are encrypted and automatically deleted after 30 days.",
        },
        {
            icon: Users,
            title: "Team Collaboration",
            description:
                "Work together with shared workspaces and real-time editing.",
        },
        {
            icon: Globe,
            title: "Format Preservation",
            description:
                "Maintains your document's original formatting and layout.",
        },
    ];

    return (
        <main className="pt-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Translate Your Documents
                            <span className="block text-indigo-600">
                                Instantly & Accurately
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Professional document translation powered by AI.
                            Support for 50+ languages, multiple formats, and
                            enterprise-grade security.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Button size="lg" asChild>
                                <Link to="/upload">
                                    Start Translating
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <Link to="/pricing">View Pricing</Link>
                            </Button>
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            Free tier available • No credit card required
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything you need for document translation
                        </h2>
                        <p className="text-lg text-gray-600">
                            Powerful features to help you translate documents
                            faster and better
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                                        <feature.icon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <CardTitle>{feature.title}</CardTitle>
                                    <CardDescription>
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            How it works
                        </h2>
                        <p className="text-lg text-gray-600">
                            Three simple steps to get your translated document
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Upload Document
                            </h3>
                            <p className="text-gray-600">
                                Upload your PDF, DOCX, or TXT file. We support
                                multiple formats.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Select Languages
                            </h3>
                            <p className="text-gray-600">
                                Choose source and target languages. Select
                                quality level.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="h-16 w-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                Download & Use
                            </h3>
                            <p className="text-gray-600">
                                Preview and download your translated document in
                                seconds.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Button size="lg" asChild>
                            <Link to="/upload">
                                Get Started Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-indigo-600">
                <div className="max-w-4xl mx-auto px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to translate your first document?
                    </h2>
                    <p className="text-xl text-indigo-100 mb-8">
                        Join thousands of users who trust TranslateDocs for
                        their translation needs
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link to="/auth/register">Sign Up Free</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-transparent text-white border-white hover:bg-white hover:text-indigo-600"
                            asChild
                        >
                            <Link to="/pricing">View Plans</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
