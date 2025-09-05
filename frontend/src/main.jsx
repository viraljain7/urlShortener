import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { RouterProvider,createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routing/routeTree.js";

import { Provider } from 'react-redux'
import store from "./store/store.js";
// Create a client
const queryClient = new QueryClient();

const router = createRouter({ routeTree })

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <ToastContainer />
    </QueryClientProvider>
  </Provider>
  </StrictMode>,
);
