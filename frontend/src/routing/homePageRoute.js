import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import UrlShortenerPage from "../pages/UrlShortenerPage"

export const homePageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: UrlShortenerPage,
  })