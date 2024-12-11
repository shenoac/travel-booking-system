import flightController from './flightController.js';
import { Router } from 'express';
import validator from './middlewares.js'
const router =  Router();
router.post('/', validator, flightController.create);
router.get('/', flightController.get);
router.get("/avgprice", flightController.getAveragePrice);
router.get("/count", flightController.getNumberOfFlights);
router.get('/:id', flightController.getByID);
router.put('/:id', validator,flightController.updateById)
router.delete('/:id', flightController.remove);

export default router;