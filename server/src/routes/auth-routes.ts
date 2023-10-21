import express from "express";
import { useAuthController } from "../controllers/auth-controller";
import { useUserValidator } from "../validators/user-validator";
import {auth} from "../middlewares/auth";

const router = express.Router();
const authController = useAuthController();
const userValidator = useUserValidator();

router.post('/email-exists', userValidator.checkEmailValidator, authController.checkEmail);
router.post('/login', userValidator.userLoginValidator, authController.login);
router.post('/refresh-token', authController.refreshTokens);
router.post('/logout', authController.logout);
router.put(
    '/change-password',
    auth(),
    userValidator.changePasswordValidator,
    authController.changePassword,
);

export default router;