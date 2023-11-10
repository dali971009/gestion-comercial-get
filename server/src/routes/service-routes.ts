import express from "express";
import {auth} from "../middlewares/auth";
import {useServiceValidator} from "../validators/service-validator";
import {useServiceController} from "../controllers/service-controller";

const router = express.Router();
const serviceController = useServiceController();
const serviceValidator = useServiceValidator();

router.get('/', serviceController.getServices);
router.get('/:id', serviceValidator.getServiceValidator, serviceController.getService);
router.post('/', serviceValidator.createServiceValidator, serviceController.createService);
router.put('/', serviceValidator.updateServiceValidator, serviceController.updateService);

export default router;
