import { LoginDto } from "@/dtos/LoginDto";
import api from "./axios-instance";
import { RegistrationDto } from "@/dtos/RegistrationDto";

export const authLogin = async (loginData: LoginDto) => {
  const response = await api.post("/api/authentication/login", {
    email: loginData.email,
    password: loginData.password,
  });
  return response.data;
};

export const authRegister = async (registerData: RegistrationDto) => {
  const response = await api.post("api/authentication/register", {
    firstName: registerData.firstName,
    lastName: registerData.lastName,
    email: registerData.email,
    birthDate: registerData.dob,
    password: registerData.password,
  });
  return response.data;
};
