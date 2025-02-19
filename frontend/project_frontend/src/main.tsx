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
    element: <CartMain />,
  },
  {
    path: Navigation.login,
    element: <CartMain />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
