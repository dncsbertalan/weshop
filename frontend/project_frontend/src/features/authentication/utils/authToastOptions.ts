import { centralToaster } from "@/components/toaster/centralToasterDef";

const serverError = () =>
  centralToaster.create({
    closable: true,
    type: "error",
    duration: 1000 * 10,
    description: "Something went wrong",
  });

const unexpectedError = () =>
  centralToaster.create({
    closable: true,
    type: "error",
    duration: 1000 * 10,
    description: "An unexpected error occured",
  });

const loginError = () =>
  centralToaster.create({
    closable: true,
    type: "error",
    duration: 1000 * 10,
    description: "Wrong username or password",
  });

const loginSuccess = () =>
  centralToaster.create({
    closable: true,
    type: "success",
    duration: 1000 * 3,
    description: "Logged in successfully",
  });

const logoutSuccess = () =>
  centralToaster.create({
    closable: true,
    type: "success",
    duration: 1000 * 3,
    description: "Logged out successfully",
  });

const registrationSuccess = () =>
  centralToaster.create({
    closable: true,
    type: "success",
    duration: 1000 * 3,
    description: "Signed up successfully",
  });

const registrationError = () =>
  centralToaster.create({
    closable: true,
    type: "error",
    duration: 1000 * 10,
    description: "Something went wrong",
  });

export const authToast = {
  serverError,
  unexpectedError,
  loginSuccess,
  registrationSuccess,
  loginError,
  logoutSuccess,
  registrationError,
};
