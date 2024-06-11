import { Router } from 'express'
import controller from '../controllers/car.js'

const router = Router()

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.put('/:id', controller.update)
<<<<<<< HEAD
router.delete('/:id', controller.delete)
=======
>>>>>>> 2d1edc18bce51b59a278b1657867cf27e0aa237b

export default router