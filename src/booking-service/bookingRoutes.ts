import { Router } from "express";
import controller from "./bookingController.js";


const router = Router();

router.get('/', controller.get);
router.get('/:id/user', controller.getUser);
router.get('/:id/flight', controller.getFlight);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;