import DeliveryPersonServices from "../services/deliveryPersonServices";
import { Request, Response } from 'express';
import httpStatus from "../utils/http-status";

export default class DeliveryPersonController {

    constructor(private deliveryPersonServices = new DeliveryPersonServices()) {}

    public async getAllDeliveryPerson(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'admin') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { data, status }= await this.deliveryPersonServices.getAllDeliveryPerson();

        return res.status(httpStatus(status)).json(data);
    };

    public async getDeliveryPersonById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { data, status }= await this.deliveryPersonServices.getDeliveryPersonById(Number(id));

        return res.status(httpStatus(status)).json(data);
    };

    public async createDeliveryPerson(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'admin') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { data, status }= await this.deliveryPersonServices.createDeliveryPerson(req.body);

        return res.status(httpStatus(status)).json(data);
    }

    public async updateIsBusy(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'admin') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }


        const { id } = req.params;
        const { isBusy } = req.body;
        const { data, status }= await this.deliveryPersonServices.updateIsBusy(Number(id), isBusy);

        return res.status(httpStatus(status)).json(data);
    };

    public async deleteDeliveryPerson(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;
        if (role !== 'admin') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { id } = req.params;
        const { data, status }= await this.deliveryPersonServices.deleteDeliveryPerson(Number(id));

        return res.status(httpStatus(status)).json(data);
    };

};