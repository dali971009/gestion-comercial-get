import express from "express";
import {auth} from "../middlewares/auth";
import {useClientValidator} from "../validators/client-validator";
import {useClientController} from "../controllers/client-controller";

const router = express.Router();
const clientController = useClientController();
const clientValidator = useClientValidator();

router.get('/', auth(), clientController.getAllClients);
router.get('/:id', auth(), clientValidator.getClientValidator, clientController.getClient);
router.post('/create', auth(), clientValidator.createClientValidator, clientController.createClient);
router.put('/:id/update', auth(), clientValidator.updateClientValidator, clientController.updateClient);

export default router;
