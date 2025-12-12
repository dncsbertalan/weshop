import { createBrowserRouter } from "react-router";

import { AppShell } from "@/components/AppShell";
import { Role } from "@/features/authentication/Role";
import { AdminPage } from "@/pages/admin-page/AdminPage";
import { CartMain } from "@/pages/cart-page/CartMain";
import { CheckoutPage } from "@/pages/checkout-page/CheckoutPage";
import { ErrorScreen } from "@/pages/ErrorScreen";
import { LoginPage } from "@/pages/login-page/LoginPage";
import { MainPage } from "@/pages/main-page/MainPage";
import { ProductPage } from "@/pages/product-page/ProductPage";
import { ProfileMain } from "@/pages/profile-page/ProfileMain";
import { RegistrationPage } from "@/pages/registration-page/RegistrationPage";
import { Navigation } from "@/routes/navigation";

import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: Navigation.home,
    element: <AppShell />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: Navigation.home,
        element: <MainPage />,
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
        path: `${Navigation.product}:id`,
        element: <ProductPage />,
      },
      {
        element: <ProtectedRoute allowedRoles={[Role.Admin, Role.User]} />,
        children: [
          {
            path: Navigation.checkout,
            element: <CheckoutPage />,
          },
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
      {
        element: <ProtectedRoute allowedRoles={[Role.Admin]} />,
        children: [
          {
            path: Navigation.admin,
            element: <AdminPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
