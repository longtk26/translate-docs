import React, { useCallback, useState } from "react";
import { Upload, X, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import { FILE_UPLOAD } from "~/constants";
import type { UploadFile } from "~/types";

interface FileUploadZoneProps {
    onFilesSelected: (files: UploadFile[]) => void;
    maxFiles?: number;
}

export function FileUploadZone({
    onFilesSelected,
    maxFiles = FILE_UPLOAD.MAX_FILES,
}: FileUploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<UploadFile[]>([]);

    const validateFile = (file: File): string | null => {
        if (file.size > FILE_UPLOAD.MAX_SIZE) {
            return `File size must be less than ${FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB`;
        }

        if (!FILE_UPLOAD.ACCEPTED_TYPES.includes(file.type)) {
            return "Unsupported file format. Please upload PDF, DOCX, DOC, TXT, or RTF files";
        }

        return null;
    };

    const handleFiles = useCallback(
        (files: FileList) => {
            const fileArray = Array.from(files);

            if (fileArray.length + uploadingFiles.length > maxFiles) {
                alert(`You can only upload up to ${maxFiles} files at once`);
                return;
            }

            const newFiles: UploadFile[] = fileArray.map((file) => {
                const error = validateFile(file);
                return {
                    file,
                    id: Math.random().toString(36).substring(7),
                    progress: 0,
                    status: error ? "error" : "uploading",
                    error,
                };
            });

            setUploadingFiles((prev) => [...prev, ...newFiles]);
            onFilesSelected(newFiles.filter((f) => f.status !== "error"));

            // Simulate upload progress
            newFiles.forEach((uploadFile) => {
                if (uploadFile.status === "uploading") {
                    simulateUpload(uploadFile.id);
                }
            });
        },
        [uploadingFiles, maxFiles, onFilesSelected],
    );

    const simulateUpload = (fileId: string) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setUploadingFiles((prev) =>
                    prev.map((f) =>
                        f.id === fileId
                            ? { ...f, progress: 100, status: "success" }
                            : f,
                    ),
                );
            } else {
                setUploadingFiles((prev) =>
                    prev.map((f) => (f.id === fileId ? { ...f, progress } : f)),
                );
            }
        }, 500);
    };

    const removeFile = (fileId: string) => {
        setUploadingFiles((prev) => prev.filter((f) => f.id !== fileId));
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleFiles(e.dataTransfer.files);
            }
        },
        [handleFiles],
    );

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
        );
    };

    return (
        <div className="space-y-4">
            <Card
                className={`border-2 border-dashed transition-colors ${
                    isDragging
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <CardContent className="flex flex-col items-center justify-center py-12">
                    <Upload
                        className={`h-12 w-12 mb-4 ${
                            isDragging ? "text-indigo-600" : "text-gray-400"
                        }`}
                    />
                    <h3 className="text-lg font-semibold mb-2">
                        Drop files here or click to upload
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 text-center max-w-sm">
                        Support for PDF, DOCX, DOC, TXT, RTF files. Max{" "}
                        {maxFiles} files, {FILE_UPLOAD.MAX_SIZE / 1024 / 1024}MB
                        each
                    </p>
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        multiple
                        accept={FILE_UPLOAD.ACCEPTED_EXTENSIONS.join(",")}
                        onChange={handleFileInput}
                    />
                    <label htmlFor="file-upload">
                        <Button asChild>
                            <span>Select Files</span>
                        </Button>
                    </label>
                </CardContent>
            </Card>

            {uploadingFiles.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                        Uploading {uploadingFiles.length} file(s)
                    </h4>
                    {uploadingFiles.map((file) => (
                        <Card key={file.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                        <FileText className="h-8 w-8 text-gray-400 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-sm font-medium truncate">
                                                    {file.file.name}
                                                </p>
                                                {file.status === "success" && (
                                                    <Badge
                                                        variant="default"
                                                        className="flex-shrink-0"
                                                    >
                                                        Uploaded
                                                    </Badge>
                                                )}
                                                {file.status === "error" && (
                                                    <Badge
                                                        variant="destructive"
                                                        className="flex-shrink-0"
                                                    >
                                                        Failed
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(file.file.size)}
                                            </p>
                                            {file.status === "uploading" && (
                                                <Progress
                                                    value={file.progress}
                                                    className="mt-2"
                                                />
                                            )}
                                            {file.error && (
                                                <div className="flex items-center gap-1 mt-2 text-red-600">
                                                    <AlertCircle className="h-3 w-3" />
                                                    <p className="text-xs">
                                                        {file.error}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeFile(file.id)}
                                        className="flex-shrink-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
