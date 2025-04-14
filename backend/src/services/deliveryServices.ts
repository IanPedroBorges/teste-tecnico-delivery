import { Delivery, DeliveryStatus, DeliveryStop } from "@prisma/client";
import deliveryModel from "../models/deliveryModel";
import { io } from "../index";

export default class DeliveryServices {
  constructor(private DeliveryModel = new deliveryModel()) {}

  public async getAllDelivery(): Promise<any> {
    const delivery = await this.DeliveryModel.getAllDelivery();
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    return { status: "ok", data: delivery };
  }

  public async getDeliveryById(id: number): Promise<any> {
    const delivery = await this.DeliveryModel.getDeliveryById(id);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    return { status: "ok", data: delivery };
  }

  public async createDelivery(data: Delivery): Promise<any> {
    const delivery = await this.DeliveryModel.createDelivery(data);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }

    io.emit("delivery-updated", { action: "create", delivery });
    return { status: "created", data: delivery };
  }

  public async updateCurrentStop(id: number, currentStop: DeliveryStop): Promise<any> {
    const delivery = await this.DeliveryModel.updtateCurrentStop(id, currentStop);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    io.emit("delivery-updated", { action: "update", id, currentStop });
    return { status: "ok", data: delivery };
  }

  public async updateDeliveryStatus(id: number, status: DeliveryStatus): Promise<any> {
    const delivery = await this.DeliveryModel.updateDeliveryStatus(id, status);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    io.emit("delivery-updated", { action: "update", id, status });
    return { status: "ok", data: delivery };
  }

  public async getDeliveryByUserId(id: number): Promise<any> {
    const delivery = await this.DeliveryModel.getDeliveryByUserId(id);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    return { status: "ok", data: delivery };
  }

  public async getDeliveryByDeliveryPersonId(id: number): Promise<any> {
    const delivery = await this.DeliveryModel.getDeliveryByDeliveryPersonId(id);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    return { status: "ok", data: delivery };
  }

  public async getDeliveryByStatus(status: DeliveryStatus): Promise<any> {
    const delivery = await this.DeliveryModel.getDeliveryByStatus(status);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    return { status: "ok", data: delivery };
  }

  public async deleteDelivery(id: number): Promise<any> {
    const deliveryVerify = await this.DeliveryModel.getDeliveryById(id);
    if (!deliveryVerify) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    const delivery = await this.DeliveryModel.deleteDelivery(id);
    if (!delivery) {
      return { status: "notFound", data: { message: "No delivery found" } };
    }
    io.emit("delivery-updated", { action: "delete", id });
    return { status: "ok", data: delivery };
  }
}
