import "./index.css";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { AuthenticationProvider } from "./features/authentication/components/AuthenticationProvider.tsx";
import router from "./routes/routes.tsx";
import { system } from "./theme/theme.ts";

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <RouterProvider router={router} />
        </AuthenticationProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);
