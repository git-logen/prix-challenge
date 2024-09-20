import { Router } from 'express';
import { UserRoutes, ProductRoutes, AuthRoutes } from './routes/index.js';


const router = Router();

router.use('/', AuthRoutes.routes);
router.use('/', AuthRoutes.routes);
router.use('/users', UserRoutes.routes);
router.use('/products', ProductRoutes.routes);

export default router