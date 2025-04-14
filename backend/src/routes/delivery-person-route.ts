import { NextFunction, Request, Response, Router } from 'express';
import DeliveryPersonController from '../controllers/deliveryPersonControll';

const router = Router();

const deliveryPersonController = new DeliveryPersonController();

router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryPersonController.getAllDeliveryPerson(req, res);
        } catch (error) {
        next(error);
        }
    },
);

router.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryPersonController.getDeliveryPersonById(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryPersonController.createDeliveryPerson(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.put(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryPersonController.updateIsBusy(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.post(
    '/delete/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryPersonController.deleteDeliveryPerson(req, res);
        } catch (error) {
        next(error);
        }
    }
);

export default router;

