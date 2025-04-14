import axios from "axios";
import { urlpadrao } from './index';
import { deliveryType } from "../types/deliveryType";


export type stopType = "START" | "CHECKPOINT1" | "CHECKPOINT2" | "END";

export const getAllDeliveries = async () => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery`);
        return response.data;
    } catch (error) {
        console.error("Error fetching deliveries:", error);
        throw error;
    }
}

export const getDeliveryById = async (id: string) => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching delivery:", error);
        throw error;
    }
}

export const createDelivery = async (delivery: deliveryType, role: string) => {
    try {
        const response = await axios.post(`${urlpadrao}/delivery`, { delivery, role });
        return response.data;
    } catch (error) {
        console.error("Error creating delivery:", error);
        throw error;
    }
}

export const updateCurrentStop = async (id: string | number, stop: stopType, role: string) => {
    try {
        const response = await axios.put(`${urlpadrao}/delivery/current-stop/${id}`, { stop, role });
        return response.data;
    } catch (error) {
        console.error("Error updating current stop:", error);
        throw error;
    }
}

export const updateDeliveryStatus = async (id: string | number, status: string, role: string) => {
    try {
        const response = await axios.put(`${urlpadrao}/delivery/status/${id}`, { status, role });
        return response.data;
    } catch (error) {
        console.error("Error updating delivery status:", error);
        throw error;
    }
}

export const getDeliveryByUserId = async (id: string) => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching delivery by user ID:", error);
        throw error;
    }
}

export const getDeliveryByDeliveryPersonId = async (id: string) => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery/delivery-person/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching delivery by delivery person ID:", error);
        throw error;
    }
}

export const deleteDelivery = async (id: string | number, role: "ADMIN" | "USER") => {
    try {
        const response = await axios.post(`${urlpadrao}/delivery/delete/${id}`, { role });
        return response.data;
    } catch (error) {
        console.error("Error deleting delivery:", error);
        throw error;
    }
}

export const getDeliveryByStatus = async (status: string) => {
    try {
        const response = await axios.get(`${urlpadrao}/delivery/status/${status}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching delivery by status:", error);
        throw error;
    }
}