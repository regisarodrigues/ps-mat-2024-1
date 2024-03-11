import { Router } from 'express';
import controller from '../controllers/car.js';

const router = Router();

router.post('/', controller.createNewCar);
router.get('/', controller.getAllCars);
router.get('/:id', controller.getCarById);
router.put('/:id', controller.updateCar);
router.delete('/:id', controller.deleteCar);

export default router;
