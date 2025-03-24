import { Navigation } from "@/models/Navigation";
import { CartMain } from "@/pages/cart-page/CartMain";
import { LoginPage } from "@/pages/login-page/LoginPage";
import { MainPage } from "@/pages/main-page/MainPage";
import { ProductPage } from "@/pages/product-page/ProductPage";
import { ProfileMain } from "@/pages/profile-page/ProfileMain";
import { RegistrationPage } from "@/pages/registration-page/RegistrationPage";
import { TempErrorScreen } from "@/pages/TempErrorScreen";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
    {
      path: Navigation.home,
      element: <MainPage />,
      errorElement: <TempErrorScreen />,
    },
    {
      path: Navigation.registration,
      element: <RegistrationPage />,
    },
    {
      path: Navigation.login,
      element: <LoginPage />,
    },
    {
      path: Navigation.product,
      element: <ProductPage />,
      
    },
    // Protected routes
    {
        element: <ProtectedRoute />,
        children: [
            {
              path: Navigation.shoppingCart,
              element: <CartMain />,
            },
            {
              path: Navigation.profile,
              element: <ProfileMain />,
            },
        ],
    },
  ]);

  export default router;