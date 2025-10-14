import api from "@/api/axios-instance";
import { LoginRequestDto } from "@/dtos/request/authentication/LoginRequestDto";
import { LoginResponseDto } from "@/dtos/response/authentication/LoginResponseDto";

export async function loginUser(loginRequestDto: LoginRequestDto) {
  const response = await api.post("/api/authentication/login", loginRequestDto);

  return LoginResponseDto.parse(response.data);
}
