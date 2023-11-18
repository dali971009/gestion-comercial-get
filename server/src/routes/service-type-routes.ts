import express from 'express';
import { auth } from '../middlewares/auth';
import { useServiceTypeValidator } from '../validators/service-type-validator';
import { useServiceTypeController } from '../controllers/service-type-controller';

const router = express.Router();
const serviceTypeController = useServiceTypeController();
const serviceTypeValidator = useServiceTypeValidator();

router.get('/', serviceTypeController.getServiceTypes);
router.get('/labels', serviceTypeController.getServiceTypeLabels);
router.get('/:id', serviceTypeValidator.getServiceTypeValidator, serviceTypeController.getServiceType);
router.post('/', serviceTypeValidator.serviceTypeCreateValidator, serviceTypeController.createServiceType);
router.put('/', serviceTypeValidator.updateServiceTypeValidator, serviceTypeController.updateServiceType);

export default router;
