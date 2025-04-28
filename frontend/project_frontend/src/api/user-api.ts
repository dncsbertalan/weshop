import { User } from "@/models/User";
import api from "./axios-instance";

export const getUser = async () => {
    const response = await api.get("/api/users/me");
    return (await response.data) as User;
}