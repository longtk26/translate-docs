const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

interface FilePayload {
    name: string;
    mime_type: string;
}

interface PresignedPostData {
    url: string;
    fields: Record<string, string>;
}

interface UploadFilesResponse {
    signed_urls: PresignedPostData[];
    message?: string;
}

export async function getPresignedUploadUrls(
    files: FilePayload[],
    destinationPath: string,
): Promise<UploadFilesResponse> {
    const response = await fetch(`${API_BASE_URL}/files/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            files,
            destination_path: destinationPath,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
            `Failed to get presigned URLs: ${response.status} ${errorBody}`,
        );
    }

    return response.json();
}

export type { PresignedPostData, FilePayload, UploadFilesResponse };
