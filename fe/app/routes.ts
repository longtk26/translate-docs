import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";
import { homeFilePath } from "./routes/home";
import { uploadFilePath } from "./routes/upload";
import { documentsFilePath } from "./routes/documents";
import { pricingFilePath } from "./routes/pricing";
import { previewFilePath } from "./routes/preview";
import { loginFilePath } from "./routes/auth/login";
import { registerFilePath } from "./routes/auth/register";
import { profileFilePath } from "./routes/profile";
import { glossaryFilePath } from "./routes/glossary";

const publicRoutes = [
    route("pricing", pricingFilePath),
    route("auth/login", loginFilePath),
    route("auth/register", registerFilePath),
] satisfies RouteConfig;

const privateRoutes = [
    route("upload", uploadFilePath),
    route("documents", documentsFilePath),
    route("documents/:id/preview", previewFilePath),
    route("profile", profileFilePath),
    route("glossary", glossaryFilePath),
] satisfies RouteConfig;

export default [
    index(homeFilePath),
    ...publicRoutes,
    ...privateRoutes,
] satisfies RouteConfig;
