import express from "express";
import {auth} from "../middlewares/auth";
import {useClientValidator} from "../validators/client-validator";
import {useClientController} from "../controllers/client-controller";

const router = express.Router();
const clientController = useClientController();
const clientValidator = useClientValidator();

router.get('/', clientController.getAllClients);
router.get('/:id', clientValidator.getClientValidator, clientController.getClient);
router.post('/', clientValidator.createClientValidator, clientController.createClient);
router.put('/:id', clientValidator.updateClientValidator, clientController.updateClient);

export default router;
