import { Delivery, DeliveryStatus, DeliveryStop } from "@prisma/client";
import prisma from "../utils/prisma";

export default class deliveryModel {

    private prisma = prisma;

    public async getAllDelivery(): Promise<Delivery[]> {
        const delivery = await this.prisma.delivery.findMany();
        return delivery;
    }

    public async getDeliveryById(id: number): Promise<Delivery | null> {
        const delivery = await this.prisma.delivery.findUnique({
            where: { id },
        });
        return delivery;
    }

    public async getDeliveryByUserId(id: number): Promise<Delivery[]> {
        const delivery = await this.prisma.delivery.findMany({
            where: { userId: id },
        });
        return delivery;
    }

    public async getDeliveryByDeliveryPersonId(id: number): Promise<Delivery[]> {
        const delivery = await this.prisma.delivery.findMany({
            where: { deliveryPersonId: id },
        });
        return delivery;
    }

    public async getDeliveryByStatus(status: DeliveryStatus): Promise<Delivery[]> {
        const delivery = await this.prisma.delivery.findMany({
            where: { status },
        });
        return delivery;
    }

    public async createDelivery(data: any): Promise<Delivery> {
        const delivery = await this.prisma.delivery.create({
            data,
        });
        return delivery;
    }

    public async updtateCurrentStop(id: number, currentStop: DeliveryStop): Promise<Delivery> {
        const delivery = await this.prisma.delivery.update({
          where: { id },
          data: { currentStop },
        });
        return delivery;
      }

    public async updateDeliveryStatus(id: number, status: DeliveryStatus): Promise<any> {
        const delivery = await this.prisma.delivery.update({
            where: { id },
            data: { status },
        });
        return delivery;
    }

}