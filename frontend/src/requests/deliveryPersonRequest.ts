import axios from "axios";
import { urlpadrao } from './index';
import { userType } from "../types/userType";
import { UserReturn } from "../types/context/loginContext";

export const getAllDeliveryPersons = async () => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery-person` );
        return response.data;
    } catch (error) {
        console.error("Error fetching delivery persons:", error);
        throw error;
    }
}

export const getDeliveryPersonById = async (id: string) => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery-person/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching delivery person:", error);
        throw error;
    }
}

export const createDeliveryPerson = async (name: string, vehicle: string, isBusy: boolean, role: 'ADMIN' | "USER") => {
    try {
        const date = {name, vehicle, isBusy};
        const response = await axios.post(`${urlpadrao}/delivery-person`, { date, role });
        return response.data;
    } catch (error) {
        console.error("Error creating delivery person:", error);
        throw error;
    }
}

export const updateDeliveryPerson = async (id: string | number, user: userType) => {
    try {
        const response = await axios.put(`${urlpadrao}/delivery-person/${id}`, { user });
        return response.data;
    } catch (error) {
        console.error("Error updating delivery person:", error);
        throw error;
    }
}

export const deleteDeliveryPerson = async (id: string | number, user: UserReturn) => {
    try {
        const response = await axios.post(`${urlpadrao}/delivery-person/delete/${id}`, { user });
        return response.data;
    } catch (error) {
        console.error("Error deleting delivery person:", error);
        throw error;
    }
}

export const updateIsBusy = async (id: string | number, isBusy: boolean, user: userType) => {
    try {
        const response = await axios.put(`${urlpadrao}/delivery-person/${id}`, { isBusy, user });
        return response.data;
    } catch (error) {
        console.error("Error updating delivery person:", error);
        throw error;
    }
}

