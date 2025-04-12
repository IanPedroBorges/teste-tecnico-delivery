import { ServiceResponse } from "../interface/services-response";
import DeliveryPersonModel from "../models/deliveryPersonModel";

export default class DeliveryPersonServices {

    constructor(private deliveryPersonModel = new DeliveryPersonModel()) {}

    public async getAllDeliveryPerson():Promise<ServiceResponse<any>> {
        const deliveryPerson = await this.deliveryPersonModel.getallDeliveryPerson();
        if (!deliveryPerson) return { status: 'notFound', data: { message: 'No delivery person found' } };
        return { status: 'ok', data: deliveryPerson };
    }

    public async getDeliveryPersonById(id: number):Promise<ServiceResponse<any>> {
        const deliveryPerson = await this.deliveryPersonModel.getDeliveryPersonById(id);
        if (!deliveryPerson) return { status: 'notFound', data: { message: 'No delivery person found' } };
        return { status: 'ok', data: deliveryPerson };
    }

    public async createDeliveryPerson(data: any):Promise<ServiceResponse<any>> {
        const deliveryPerson = await this.deliveryPersonModel.createDeliveryPerson(data);
        if (!deliveryPerson) return { status: 'notFound', data: { message: 'No delivery person found' } };
        return { status: 'created', data: deliveryPerson };
    }

    public async updateIsBusy(id: number, isBusy: boolean):Promise<ServiceResponse<any>> {
        const deliveryPerson = await this.deliveryPersonModel.uptdateIsBusy(id, isBusy);
        if (!deliveryPerson) return { status: 'notFound', data: { message: 'No delivery person found' } };
        return { status: 'ok', data: deliveryPerson };
    }

    public async deleteDeliveryPerson(id: number):Promise<ServiceResponse<any>> {
        const deliveryPerson = await this.deliveryPersonModel.getDeliveryPersonById(id);
        if (!deliveryPerson) return { status: 'notFound', data: { message: 'No delivery person found' } };
        await this.deliveryPersonModel.deleteDeliveryPerson(id);
        return { status: 'ok', data: { message: 'Delivery person deleted successfully' } };
    }

};