import express from "express";
import {auth} from "../middlewares/auth";
import {useUserValidator} from "../validators/user-validator";
import {useUserController} from "../controllers/user-controller";

const router = express.Router();
const userController = useUserController();
const userValidator = useUserValidator();

router.get('/', userController.getUsers);
router.get('/:id', userValidator.getUserValidator, userController.getUser);
router.post('/', userValidator.userCreateValidator, userController.createUser);
router.put('/', userValidator.updateUserValidator, userController.updateUser);

export default router;
