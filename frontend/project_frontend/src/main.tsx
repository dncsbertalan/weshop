import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './components/ui/provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { MainPage } from './pages/main-page/MainPage.tsx'
import { TempErrorScreen } from './pages/TempErrorScreen.tsx'
import { ProfileMain } from './pages/profile-page/ProfileMain.tsx'
import { CartMain } from './pages/cart-page/CartMain.tsx'
import { Navigation } from './models/Navigation.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RegistrationPage } from './pages/registration-page/RegistrationPage.tsx'
import { LoginPage } from './pages/login/LoginPage.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartProvider } from './context/cartContext.tsx'

const router = createBrowserRouter([
  {
    path: Navigation.home,
    element: <MainPage />,
    errorElement: <TempErrorScreen />,
  },
  {
    path: Navigation.profile,
    element: <ProfileMain />,
  },
  {
    path: Navigation.shoppingCart,
    element: <CartMain />,
  },
  {
    path: Navigation.registration,
    element: <RegistrationPage />,
  },
  {
    path: Navigation.login,
    element: <LoginPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <Provider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Provider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
