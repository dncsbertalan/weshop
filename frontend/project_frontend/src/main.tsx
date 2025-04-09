import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/authContext.tsx'
import { CartProvider } from './context/cartContext.tsx'
import { BrowserRouter } from 'react-router'
import { ProductProvider } from './context/productContext.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme/theme.ts'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ProductProvider>
              <ChakraProvider value={system}>
                {/*<RouterProvider router={router} />*/}
                <AppRoutes />
              </ChakraProvider>
            </ProductProvider>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
