import api from "@/api/axios-instance";
import { RegistrationRequestDto } from "@/dtos/request/authentication/RegistrationRequestDto";

export async function registerUser(registrationRequestDto: RegistrationRequestDto) {
  await api.post("api/authentication/register", registrationRequestDto);
}
