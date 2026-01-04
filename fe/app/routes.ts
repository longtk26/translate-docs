import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";
import { homeFilePath } from "./routes/home";

const publicRoutes = [] satisfies RouteConfig;

const privateRoutes = [] satisfies RouteConfig;

export default [index(homeFilePath)] satisfies RouteConfig;
