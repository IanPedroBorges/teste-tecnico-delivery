import { Router } from 'express';

import usersRoute from './users-route';
import deliveryPersonRoute from './delivery-person-route';
import deliveryRoute from './delivery-route';

const router = Router();

router.use('/users', usersRoute);
router.use('/delivery-person', deliveryPersonRoute);
router.use('/delivery', deliveryRoute);


export default router;