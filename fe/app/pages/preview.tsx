import { useState } from "react";
import { useParams, Link } from "react-router";
import type { Route } from "./+types/preview";
import {
    Download,
    ZoomIn,
    ZoomOut,
    ChevronLeft,
    ChevronRight,
    Edit,
    RotateCw,
    Share2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Card } from "~/components/ui/card";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Document Preview - TranslateDocs" },
        { name: "description", content: "Preview translated document" },
    ];
}

export default function Preview() {
    const params = useParams();
    const [zoom, setZoom] = useState(100);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<
        "original" | "translated" | "side-by-side"
    >("translated");

    // Mock data
    const document = {
        id: params.id || "1",
        name: "Business Proposal",
        pages: 12,
        sourceLanguage: "en",
        targetLanguage: "es",
        status: "completed",
    };

    const handleZoomIn = () => {
        setZoom((prev) => Math.min(prev + 10, 200));
    };

    const handleZoomOut = () => {
        setZoom((prev) => Math.max(prev - 10, 50));
    };

    return (
        <main className="pt-16 h-screen flex flex-col">
            {/* Toolbar */}
            <div className="border-b bg-white px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="/documents">
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Documents
                        </Link>
                    </Button>
                    <div>
                        <h2 className="font-semibold">{document.name}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>
                                {document.sourceLanguage.toUpperCase()} →{" "}
                                {document.targetLanguage.toUpperCase()}
                            </span>
                            <Badge variant="default" className="text-xs">
                                Completed
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                    <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </div>

            {/* View Mode Tabs */}
            <div className="border-b bg-gray-50 px-6 py-2">
                <Tabs
                    value={viewMode}
                    onValueChange={(v) => setViewMode(v as any)}
                >
                    <TabsList>
                        <TabsTrigger value="original">Original</TabsTrigger>
                        <TabsTrigger value="translated">Translated</TabsTrigger>
                        <TabsTrigger value="side-by-side">
                            Side-by-Side
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Preview Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Main Preview */}
                <div className="flex-1 flex flex-col bg-gray-100">
                    {/* Controls */}
                    <div className="border-b bg-white px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">
                                Page {currentPage} of {document.pages}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(document.pages, p + 1),
                                    )
                                }
                                disabled={currentPage === document.pages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleZoomOut}
                            >
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <span className="text-sm w-16 text-center">
                                {zoom}%
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleZoomIn}
                            >
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <RotateCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Document Display */}
                    <div className="flex-1 overflow-auto p-8">
                        {viewMode === "side-by-side" ? (
                            <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
                                <Card className="p-8 bg-white shadow-lg aspect-[8.5/11]">
                                    <div className="text-center text-gray-400 py-20">
                                        <p className="text-lg font-medium mb-2">
                                            Original Document
                                        </p>
                                        <p className="text-sm">
                                            (
                                            {document.sourceLanguage.toUpperCase()}
                                            )
                                        </p>
                                    </div>
                                </Card>
                                <Card className="p-8 bg-white shadow-lg aspect-[8.5/11]">
                                    <div className="text-center text-gray-400 py-20">
                                        <p className="text-lg font-medium mb-2">
                                            Translated Document
                                        </p>
                                        <p className="text-sm">
                                            (
                                            {document.targetLanguage.toUpperCase()}
                                            )
                                        </p>
                                    </div>
                                </Card>
                            </div>
                        ) : (
                            <Card
                                className="max-w-4xl mx-auto p-8 bg-white shadow-lg aspect-[8.5/11]"
                                style={{
                                    transform: `scale(${zoom / 100})`,
                                    transformOrigin: "top center",
                                }}
                            >
                                <div className="text-center text-gray-400 py-20">
                                    <p className="text-lg font-medium mb-2">
                                        {viewMode === "original"
                                            ? "Original"
                                            : "Translated"}{" "}
                                        Document Preview
                                    </p>
                                    <p className="text-sm">
                                        (
                                        {viewMode === "original"
                                            ? document.sourceLanguage.toUpperCase()
                                            : document.targetLanguage.toUpperCase()}
                                        )
                                    </p>
                                    <p className="text-xs mt-4">
                                        Page {currentPage} of {document.pages}
                                    </p>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Sidebar - Page Thumbnails */}
                <div className="w-48 border-l bg-white overflow-y-auto p-4">
                    <h3 className="text-sm font-semibold mb-3">Pages</h3>
                    <div className="space-y-2">
                        {Array.from(
                            { length: document.pages },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-full aspect-[8.5/11] border-2 rounded-md flex items-center justify-center text-xs transition-colors ${
                                    currentPage === page
                                        ? "border-indigo-600 bg-indigo-50"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
