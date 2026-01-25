import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "./+types/upload";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { FileUploadZone } from "~/components/upload/FileUploadZone";
import { LanguageSelector } from "~/components/translation/LanguageSelector";
import type { UploadFile, TranslationConfig } from "~/types";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Upload Document - TranslateDocs" },
        { name: "description", content: "Upload and translate your documents" },
    ];
}

export default function Upload() {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);
    const [translationConfig, setTranslationConfig] =
        useState<TranslationConfig>({
            sourceLanguage: "en",
            targetLanguages: [],
            quality: "standard",
            preserveFormatting: true,
            autoDetect: false,
        });

    const handleFilesSelected = (files: UploadFile[]) => {
        console.log("Files selected:", files);
    };

    const handleConfigChange = (config: Partial<TranslationConfig>) => {
        setTranslationConfig((prev) => ({ ...prev, ...config }));
    };

    const calculateEstimate = () => {
        const mockPages = uploadedFiles.length * 5; // Mock: 5 pages per file
        const pricePerPage =
            translationConfig.quality === "basic"
                ? 0.1
                : translationConfig.quality === "standard"
                  ? 0.2
                  : 0.5;
        const totalCost =
            mockPages * pricePerPage * translationConfig.targetLanguages.length;
        const discount =
            translationConfig.targetLanguages.length >= 3 ? 0.1 : 0;
        const finalCost = totalCost * (1 - discount);

        return {
            pages: mockPages,
            languages: translationConfig.targetLanguages.length,
            totalCost: finalCost,
            discount: discount * 100,
        };
    };

    const handleStartTranslation = () => {
        // Here you would make API call to start translation
        console.log("Starting translation with config:", translationConfig);
        console.log("Files:", uploadedFiles);

        // Navigate to documents page (or to a processing page)
        navigate("/documents");
    };

    const isReadyToTranslate =
        uploadedFiles.length > 0 &&
        translationConfig.targetLanguages.length > 0 &&
        uploadedFiles.every((f) => f.status === "success");

    const estimate = uploadedFiles.length > 0 ? calculateEstimate() : null;

    return (
        <main className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Upload & Translate Documents
                </h1>
                <p className="text-gray-600">
                    Upload your documents and select translation preferences
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - File Upload */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Step 1: Upload Documents</CardTitle>
                            <CardDescription>
                                Upload PDF, DOCX, DOC, TXT, or RTF files (max
                                10MB each)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FileUploadZone
                                onFilesSelected={handleFilesSelected}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Step 2: Configure Translation</CardTitle>
                            <CardDescription>
                                Select languages and quality preferences
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LanguageSelector
                                config={translationConfig}
                                onChange={handleConfigChange}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Summary */}
                <div className="space-y-6">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Translation Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {uploadedFiles.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center py-8">
                                    Upload files to see estimate
                                </p>
                            ) : (
                                <>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">
                                                Documents:
                                            </span>
                                            <span className="font-medium">
                                                {
                                                    uploadedFiles.filter(
                                                        (f) =>
                                                            f.status ===
                                                            "success",
                                                    ).length
                                                }
                                            </span>
                                        </div>
                                        {estimate && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Estimated Pages:
                                                    </span>
                                                    <span className="font-medium">
                                                        {estimate.pages}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Target Languages:
                                                    </span>
                                                    <span className="font-medium">
                                                        {estimate.languages}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">
                                                        Quality:
                                                    </span>
                                                    <span className="font-medium capitalize">
                                                        {
                                                            translationConfig.quality
                                                        }
                                                    </span>
                                                </div>
                                                {estimate.discount > 0 && (
                                                    <div className="flex justify-between text-green-600">
                                                        <span>
                                                            Multi-language
                                                            Discount:
                                                        </span>
                                                        <span className="font-medium">
                                                            -{estimate.discount}
                                                            %
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="border-t pt-2 mt-2">
                                                    <div className="flex justify-between text-lg font-bold">
                                                        <span>
                                                            Estimated Cost:
                                                        </span>
                                                        <span>
                                                            $
                                                            {estimate.totalCost.toFixed(
                                                                2,
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t">
                                        <Button
                                            className="w-full"
                                            size="lg"
                                            disabled={!isReadyToTranslate}
                                            onClick={handleStartTranslation}
                                        >
                                            Start Translation
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        {!isReadyToTranslate &&
                                            translationConfig.targetLanguages
                                                .length === 0 && (
                                                <p className="text-xs text-gray-500 mt-2 text-center">
                                                    Please select at least one
                                                    target language
                                                </p>
                                            )}
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">
                                Processing Time
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                {translationConfig.quality === "basic" && (
                                    <p className="text-gray-600">
                                        ⏱️ 2-5 minutes per document
                                    </p>
                                )}
                                {translationConfig.quality === "standard" && (
                                    <p className="text-gray-600">
                                        ⏱️ 10-15 minutes per document
                                    </p>
                                )}
                                {translationConfig.quality === "premium" && (
                                    <p className="text-gray-600">
                                        ⏱️ 24-48 hours (human review)
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
