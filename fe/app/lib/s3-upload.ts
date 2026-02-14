import type { PresignedPostData } from "./api";

export interface UploadProgress {
    fileId: string;
    progress: number;
    status: "uploading" | "success" | "error";
    error?: string;
}

type ProgressCallback = (progress: UploadProgress) => void;

/**
 * Upload a file to S3 using a presigned POST URL with multipart/form-data.
 * Uses XMLHttpRequest to provide real-time upload progress tracking.
 */
export function uploadFileToS3(
    file: File,
    fileId: string,
    presignedPost: PresignedPostData,
    onProgress: ProgressCallback,
): { promise: Promise<void>; abort: () => void } {
    const xhr = new XMLHttpRequest();

    const promise = new Promise<void>((resolve, reject) => {
        const formData = new FormData();

        // Append all presigned fields first (order matters for S3)
        for (const [key, value] of Object.entries(presignedPost.fields)) {
            formData.append(key, value);
        }

        // The file must be the last field in the form
        formData.append("file", file);

        xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                onProgress({
                    fileId,
                    progress,
                    status: "uploading",
                });
            }
        });

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                onProgress({
                    fileId,
                    progress: 100,
                    status: "success",
                });
                resolve();
            } else {
                const error = `Upload failed with status ${xhr.status}`;
                onProgress({
                    fileId,
                    progress: 0,
                    status: "error",
                    error,
                });
                reject(new Error(error));
            }
        });

        xhr.addEventListener("error", () => {
            const error = "Network error during upload";
            onProgress({
                fileId,
                progress: 0,
                status: "error",
                error,
            });
            reject(new Error(error));
        });

        xhr.addEventListener("abort", () => {
            onProgress({
                fileId,
                progress: 0,
                status: "error",
                error: "Upload cancelled",
            });
            reject(new Error("Upload cancelled"));
        });

        xhr.open("POST", presignedPost.url);
        xhr.send(formData);
    });

    return {
        promise,
        abort: () => xhr.abort(),
    };
}
