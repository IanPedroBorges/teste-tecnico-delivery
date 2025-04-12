import UsersService from "../services/usersServices";
import httpStatus from "../utils/http-status";
import { Request, Response } from 'express';

export default class UsersController {

    constructor(private usersService = new UsersService()) {}


    public async login(req: Request, res: Response): Promise<Response>  {
        const { data, status }= await this.usersService.login(req.body);

        return res.status(httpStatus(status)).json(data);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        const { data, status }= await this.usersService.createUser(req.body);

        return res.status(httpStatus(status)).json(data);
    }

    public async getAllUsers(req: Request, res: Response): Promise<Response> {
        const { role } = req.body;

        if (role !== 'admin') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }

        const { data, status }= await this.usersService.getAllUsers();

        return res.status(httpStatus(status)).json(data);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { role } = req.body;
        if (role !== 'admin') {
            return res.status(httpStatus("unauthorized")).json({ message: 'Only admins can access this route' });
        }
        const { data, status }= await this.usersService.deleteUser(Number(id));

        return res.status(httpStatus(status)).json(data);
    }

};