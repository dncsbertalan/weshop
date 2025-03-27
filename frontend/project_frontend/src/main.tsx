import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './components/ui/provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './context/authContext.tsx'
import { CartProvider } from './context/cartContext.tsx'
import { BrowserRouter } from 'react-router'
import { ProductProvider } from './context/productContext.tsx'
import AppRoutes from './routes/AppRoutes.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <ProductProvider>
              <Provider>
                {/*<RouterProvider router={router} />*/}
                <AppRoutes />
              </Provider>
            </ProductProvider>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
