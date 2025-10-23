import api from "@/api/axios-instance";
import { UserDto } from "@/dtos/response/user/UserDto";

export async function getCurrentUser() {
  const response = await api.get("/api/users/me");

  return UserDto.parse(response.data);
}
