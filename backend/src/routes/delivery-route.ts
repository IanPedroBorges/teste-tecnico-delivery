import { NextFunction, Request, Response, Router } from 'express';
import DeliveryController from '../controllers/deliveryControll';


const router = Router();

const deliveryRouteController = new DeliveryController();

router.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.getAllDelivery(req, res);
        } catch (error) {
        next(error);
        }
    },
);

router.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.getDeliveryById(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.createDelivery(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.put(
    '/current-stop/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.updateCurrentStop(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.put(
    '/status/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.updateDeliveryStatus(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.get(
    '/user/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.getDeliveryByUserId(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.get(
    '/delivery-person/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.getDeliveryByDeliveryPersonId(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.get(
    '/status/:status',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.getDeliveryByStatus(req, res);
        } catch (error) {
        next(error);
        }
    }
);

router.post(
    '/delete/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        await deliveryRouteController.deleteDelivery(req, res);
        } catch (error) {
        next(error);
        }
    }
);

export default router;