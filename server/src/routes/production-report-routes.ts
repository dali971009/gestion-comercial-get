import express from 'express';
import { auth } from '../middlewares/auth';
// import { useProductionReportValidator } from '../validators/commercial-offer-validator';
import { useProductionReportController } from '../controllers/production-report-controller';

const router = express.Router();
const productionReportController = useProductionReportController();
// const productionReportValidator = useProductionReportValidator();

router.get('/', productionReportController.getProductionReports);
/*router.get('/:id', productionReportValidator.getProductionReportValidator, productionReportController.getProductionReport);
router.post(
  '/',
  productionReportValidator.createProductionReportValidator,
  productionReportController.createProductionReport
);
router.put(
  '/',
  productionReportValidator.updateProductionReportValidator,
  productionReportController.updateProductionReport
);*/
router.get('/:id/pdf', productionReportController.printInvoice);

export default router;
