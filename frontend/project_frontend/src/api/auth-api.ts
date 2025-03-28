import { LoginDto } from "@/dtos/LoginDto";
import { authApi_login, authApi_register, authToken } from "./api-constants";
import api from "./axios-instance";
import { RegistrationDto } from "@/dtos/RegistrationDto";

export const authLogin = async (loginData: LoginDto) => {

    try {
        const response = await api.post(authApi_login, {
            email: loginData.email,
            password: loginData.password
        });

        console.log("Login successful. TOOD HANDLE LOGIN STUFF");
        // TODO:
        //       - go to main page
        //       - handle staying logged in

        //localStorage.setItem(authToken, JSON.stringify(response.data));
        localStorage.setItem(authToken, response.data);
        return response.data;
    } catch (error: any) {
        console.error("Login was not successful. Error: ", error.response?.data || error.message);
        return null;
    }
};

export const authRegister = async (registerData: RegistrationDto) => {
    try {
        const response = await api.post(authApi_register, {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            birthDate: registerData.dob,
            password: registerData.password
        });

        console.log("Successful registration.");

        return response.data;
    } catch (error: any) {
        console.error("Registration was not successful. Error: ", error.response?.data || error.message);
        return null;
    }
};