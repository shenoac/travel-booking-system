import { Router } from "express";
import userController from "./userController.js";
import userMiddleware from './middlewares.js'
import authController from "./authController.js";

const router  = Router();

// Auth Routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/refreshtoken', authController.handelRefreshTokenGeneration);


router.get('/', userMiddleware.auth, userController.get);
router.get('/:id', userController.getByID);
router.post('/', userMiddleware.userValidation, userMiddleware.userVallidationHandler, userController.create);
router.put('/:id',userMiddleware.userValidation, userMiddleware.userVallidationHandler,  userController.update);
router.delete('/:id', userController.remove);

export default router;