import { DeliveryPerson } from "@prisma/client";
import prisma from "../utils/prisma";

export default class DeliveryPersonModel {
    private prisma = prisma;

    public async getallDeliveryPerson(): Promise<DeliveryPerson[]> {
        const deliveryPerson = await this.prisma.deliveryPerson.findMany();
        return deliveryPerson;
    }

    public async getDeliveryPersonById(id: number): Promise<DeliveryPerson | null> {
        const deliveryPerson = await this.prisma.deliveryPerson.findUnique({
            where: { id },
        });
        return deliveryPerson;
    }

    public async createDeliveryPerson(data: any): Promise<DeliveryPerson> {
        const deliveryPerson = await this.prisma.deliveryPerson.create({
            data,
        });
        return deliveryPerson;
    }

    public async uptdateIsBusy(id: number, isBusy: boolean): Promise<DeliveryPerson> {
        const deliveryPerson = await this.prisma.deliveryPerson.update({
            where: { id },
            data: { isBusy },
        });
        return deliveryPerson;
    }

    public async deleteDeliveryPerson(id: number): Promise<DeliveryPerson> {
        const deliveryPerson = await this.prisma.deliveryPerson.delete({
            where: { id },
        });
        return deliveryPerson;
    }
}
