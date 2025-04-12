import { NextFunction, Request, Response, Router } from 'express';
import UsersController from '../controllers/usersControll';

const router = Router();

const usersController = new UsersController();

router.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await usersController.login(req, res);
      } catch (error) {
        next(error);
      }
    }
  );

router.post('/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await usersController.createUser(req, res);
    } catch (error) {
      next(error);
    }
  });

router.get('/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await usersController.getAllUsers(req, res);
    } catch (error) {
      next(error);
    }
  });
  

export default router;