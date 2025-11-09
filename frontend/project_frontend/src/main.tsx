import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "./context/cartContext.tsx";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "./theme/theme.ts";
import { ColorModeProvider } from "./components/ui/color-mode.tsx";
import { OrdersProvider } from "./context/OrdersContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { AuthenticationProvider } from "./features/authentication/components/AuthenticationProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthenticationProvider>
          <UserProvider>
            <CartProvider>
              <OrdersProvider>
                <ChakraProvider value={system}>
                  <ColorModeProvider>
                    <AppRoutes />
                  </ColorModeProvider>
                </ChakraProvider>
              </OrdersProvider>
            </CartProvider>
          </UserProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
