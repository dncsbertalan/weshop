import { UserDto } from "@/dtos/response/user/UserDto";
import { UserInformatioDto } from "@/dtos/response/user/UserInformatioDto";
import { getUserName } from "@/features/users/utils/getUserName";

export function getUserCartName(user: UserDto | UserInformatioDto, isOwnCart?: boolean) {
  return isOwnCart ? "Your" : `${getUserName(user)}'s`;
}
