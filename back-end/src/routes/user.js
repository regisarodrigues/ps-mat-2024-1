import { Router } from 'express';
import controller from '../controllers/user.js';

const router = Router();

router.post('/', controller.createNewUser);
router.get('/', controller.getAllUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
