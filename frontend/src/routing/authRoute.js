import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Auth from "../pages/Auth"

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: Auth,
  })