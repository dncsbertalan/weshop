import { User } from "@/models/user";

import api from "./axios-instance";

export const getUser = async () => {
    const response = await api.get("/api/users/me");
    return (await response.data) as User;
}