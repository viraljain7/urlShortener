import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homePageRoute"
import { authRoute } from "./authRoute"
import { dashboardRoute } from "./dashboardRoute"
import App from "../App.jsx"

export const rootRoute = createRootRoute({
    component: App
})

export const routeTree =rootRoute.addChildren([
    homePageRoute, 
    authRoute, 
    dashboardRoute
])
