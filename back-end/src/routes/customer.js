import { Router } from 'express';
import controller from '../controllers/customer.js';

const router = Router();

router.post('/', controller.createNewCustomer);
router.get('/', controller.getAllCustomers);
router.get('/:id', controller.getCustomerById);
router.put('/:id', controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

export default router;
