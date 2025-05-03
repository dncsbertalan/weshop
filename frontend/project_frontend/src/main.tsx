import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { BrowserRouter } from 'react-router'
import { ProductProvider } from './context/ProductContext.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme/theme.ts'
import { ColorModeProvider } from './components/ui/color-mode.tsx'
import { OrdersProvider } from './context/OrdersContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <OrdersProvider>
              <BrowserRouter>
                <ProductProvider>
                  <ChakraProvider value={system}>
                    <ColorModeProvider>
                      <AppRoutes />
                    </ColorModeProvider>
                  </ChakraProvider>
                </ProductProvider>
              </BrowserRouter>
            </OrdersProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
