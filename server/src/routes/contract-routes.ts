import express from "express";
import {auth} from "../middlewares/auth";
import {useContractValidator} from "../validators/contract-validator";
import {useContractController} from "../controllers/contract-controller";

const router = express.Router();
const contractController = useContractController();
const contractValidator = useContractValidator();

router.get('/', contractController.getContracts);
router.get('/:id', contractValidator.getContractValidator, contractController.getContract);
router.post('/', contractValidator.contractCreateValidator, contractController.createContract);
router.put('/', contractValidator.updateContractValidator, contractController.updateContract);

export default router;
