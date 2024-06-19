import express from 'express';
import controller from '../controllers/about.js';

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
//router.get('/:id', controller.retrieveOne);

export default router;
