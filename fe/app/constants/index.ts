// Language configurations
export const LANGUAGES = [
    { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
    { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
    { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
    {
        code: "zh-CN",
        name: "Chinese (Simplified)",
        nativeName: "简体中文",
        flag: "🇨🇳",
    },
    {
        code: "zh-TW",
        name: "Chinese (Traditional)",
        nativeName: "繁體中文",
        flag: "🇹🇼",
    },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
] as const;

// Quality levels for translation
export const QUALITY_LEVELS = [
    {
        id: "basic",
        name: "Basic",
        description: "Fast machine translation",
        time: "2-5 minutes",
        price: 0.1,
        features: ["Machine translation", "Basic accuracy", "Fast processing"],
    },
    {
        id: "standard",
        name: "Standard",
        description: "Enhanced machine translation with post-editing",
        time: "10-15 minutes",
        price: 0.2,
        features: [
            "Enhanced translation",
            "Better accuracy",
            "Standard processing",
        ],
    },
    {
        id: "premium",
        name: "Premium",
        description: "Human review + machine translation",
        time: "24-48 hours",
        price: 0.5,
        features: [
            "Human reviewed",
            "Professional quality",
            "Guaranteed accuracy",
        ],
    },
] as const;

// Document statuses
export const DOCUMENT_STATUS = {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed",
} as const;

// File upload constraints
export const FILE_UPLOAD = {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_FILES: 10,
    ACCEPTED_TYPES: [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
        "application/rtf",
    ],
    ACCEPTED_EXTENSIONS: [".pdf", ".docx", ".doc", ".txt", ".rtf"],
} as const;

// Subscription plans
export const SUBSCRIPTION_PLANS = [
    {
        id: "basic",
        name: "Basic",
        price: 19,
        period: "month",
        pages: 100,
        storage: "5GB",
        quality: "basic",
        features: [
            "100 pages per month",
            "Basic translation quality",
            "5GB storage",
            "Email support",
            "10 languages",
        ],
    },
    {
        id: "professional",
        name: "Professional",
        price: 49,
        period: "month",
        pages: 500,
        storage: "25GB",
        quality: "standard",
        features: [
            "500 pages per month",
            "Standard translation quality",
            "25GB storage",
            "Priority email support",
            "50+ languages",
            "Custom glossaries",
            "Translation memory",
        ],
        popular: true,
    },
    {
        id: "business",
        name: "Business",
        price: 149,
        period: "month",
        pages: 2000,
        storage: "50GB",
        quality: "premium",
        features: [
            "2000 pages per month",
            "Premium translation quality",
            "50GB storage",
            "24/7 priority support",
            "50+ languages",
            "Custom glossaries",
            "Translation memory",
            "Team collaboration",
            "API access",
            "Human review included",
        ],
    },
] as const;

// Routes
export const ROUTES = {
    HOME: "/",
    UPLOAD: "/upload",
    DOCUMENTS: "/documents",
    PREVIEW: "/documents/:id/preview",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/profile",
    PRICING: "/pricing",
    GLOSSARY: "/glossary",
} as const;
