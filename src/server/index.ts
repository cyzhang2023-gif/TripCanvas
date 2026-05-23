/** Server module barrel — re-exports all route handlers */

export { handleTripsRoutes } from "./routes/trips";
export { handleImageRoutes } from "./routes/images";
export { handleExploreRoutes } from "./routes/explore";
export { handleQuizRoutes } from "./routes/quiz";
export { handleN8nRoutes } from "./routes/n8n-routes";
export { apiJson, apiError, getOwnerId } from "./utils";
