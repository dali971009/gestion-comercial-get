import express from 'express';
import { auth } from '../middlewares/auth';
import { useServiceRequestValidator } from '../validators/service-request-validator';
import { useServiceRequestController } from '../controllers/service-request-controller';

const router = express.Router();
const serviceRequestController = useServiceRequestController();
const serviceRequestValidator = useServiceRequestValidator();

router.get('/', serviceRequestController.getServiceRequests);
router.get('/:id', serviceRequestValidator.getServiceRequestValidator, serviceRequestController.getServiceRequest);
router.post('/', serviceRequestValidator.serviceRequestCreateValidator, serviceRequestController.createServiceRequest);
router.put('/', serviceRequestValidator.updateServiceRequestValidator, serviceRequestController.updateServiceRequest);

export default router;
