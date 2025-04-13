import DeliveryServices from "../services/deliveryServices";
import httpStatus from "../utils/http-status";
import { Request, Response } from 'express';
import { DeliveryStatus } from "@prisma/client";

export default class DeliveryController {

    constructor(private deliveryServices = new DeliveryServices()) {};

    public async getAllDelivery(req: Request, res: Response): Promise<Response> {
        const { data, status } = await this.deliveryServices.getAllDelivery();
        return res.status(httpStatus(status)).json(data);
    };

    public async getDeliveryById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { data, status } = await this.deliveryServices.getDeliveryById(Number(id));
        return res.status(httpStatus(status)).json(data);
    };

    public async createDelivery(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'ADMIN') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { delivery } = req.body;

        const { data, status } = await this.deliveryServices.createDelivery(delivery);
        return res.status(httpStatus(status)).json(data);
    };

    public async updateCurrentStop(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'ADMIN') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { id } = req.params;
        const { stop } = req.body;
        const { data, status } = await this.deliveryServices.updateCurrentStop(Number(id), stop);
        return res.status(httpStatus(status)).json(data);
    };

    public async updateDeliveryStatus(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'ADMIN') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { id } = req.params;
        const { status } = req.body;
        const { data, status: responseStatus } = await this.deliveryServices.updateDeliveryStatus(Number(id), status);
        return res.status(httpStatus(responseStatus)).json(data);
    };

    public async getDeliveryByUserId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { data, status } = await this.deliveryServices.getDeliveryByUserId(Number(id));
        return res.status(httpStatus(status)).json(data);
    };

    public async getDeliveryByDeliveryPersonId(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { data, status } = await this.deliveryServices.getDeliveryByDeliveryPersonId(Number(id));
        return res.status(httpStatus(status)).json(data);
    };

    public async getDeliveryByStatus(req: Request, res: Response): Promise<Response> {
        const { status } = req.params;
        const { data, status: responseStatus } = await this.deliveryServices.getDeliveryByStatus(status as DeliveryStatus);
        return res.status(httpStatus(responseStatus)).json(data);
    };

};