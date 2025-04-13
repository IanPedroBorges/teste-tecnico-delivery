import axios from "axios";
import { urlpadrao } from './index';
import { userType } from "../types/userType";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${urlpadrao}/users`, { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

export const register = async (user: userType ) => {
    try {
        const response = await axios.post(`${urlpadrao}/users/register`, { user });
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${urlpadrao}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
