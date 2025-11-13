import { Route,Routes } from "react-router";

import { Role } from "@/features/authentication/Role";
import { AdminPage } from "@/pages/admin-page/AdminPage";
import { CartMain } from "@/pages/cart-page/CartMain";
import { CheckoutPage } from "@/pages/checkout-page/CheckoutPage";
import { LoginPage } from "@/pages/login-page/LoginPage";
import { MainPage } from "@/pages/main-page/MainPage";
import { ProductPage } from "@/pages/product-page/ProductPage";
import { ProfileMain } from "@/pages/profile-page/ProfileMain";
import { RegistrationPage } from "@/pages/registration-page/RegistrationPage";
import { TempErrorScreen } from "@/pages/TempErrorScreen";
import { Navigation } from "@/routes/navigation";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={Navigation.home} element={<MainPage />} />
      <Route path={Navigation.registration} element={<RegistrationPage />} />
      <Route path={Navigation.login} element={<LoginPage />} />
      <Route path={Navigation.product} element={<ProductPage />} />
      <Route element={<ProtectedRoute allowedRoles={[Role.Admin, Role.User]} />}>
        <Route path={Navigation.checkout} element={<CheckoutPage />} />
        <Route path={Navigation.shoppingCart} element={<CartMain />} />
        <Route path={Navigation.profile} element={<ProfileMain />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={[Role.Admin]} redirectPath={Navigation.home} />}>
        <Route path={Navigation.admin} element={<AdminPage />} />
      </Route>
      <Route path="*" element={<TempErrorScreen />} />
    </Routes>
  );
};

export default AppRoutes;
