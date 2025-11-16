import { UserDto } from "@/dtos/response/user/UserDto";
import { UserInformatioDto } from "@/dtos/response/user/UserInformatioDto";

export function getUserName(user: UserInformatioDto | UserDto) {
  return `${user.firstName} ${user.lastName}`;
}
