export interface Document {
    id: string;
    name: string;
    originalName: string;
    size: number;
    status: "pending" | "processing" | "completed" | "failed";
    sourceLanguage: string;
    targetLanguages: string[];
    quality: "basic" | "standard" | "premium";
    uploadedAt: string;
    completedAt?: string;
    pages: number;
    cost: number;
    preserveFormatting: boolean;
}

export interface UploadFile {
    file: File;
    id: string;
    progress: number;
    status: "uploading" | "success" | "error";
    error?: string;
}

export interface TranslationConfig {
    sourceLanguage: string;
    targetLanguages: string[];
    quality: "basic" | "standard" | "premium";
    preserveFormatting: boolean;
    autoDetect: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    subscription?: {
        plan: "free" | "basic" | "professional" | "business";
        pagesUsed: number;
        pagesQuota: number;
        storageUsed: number;
        storageQuota: number;
    };
}

export interface GlossaryTerm {
    id: string;
    sourceTerm: string;
    targetTerm: string;
    partOfSpeech?: string;
    context?: string;
    caseSensitive: boolean;
}

export interface Glossary {
    id: string;
    name: string;
    description?: string;
    sourceLanguage: string;
    targetLanguage: string;
    terms: GlossaryTerm[];
    createdAt: string;
    updatedAt: string;
}
