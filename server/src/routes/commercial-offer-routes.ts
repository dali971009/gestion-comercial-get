import express from 'express';
import { auth } from '../middlewares/auth';
import { useCommercialOfferValidator } from '../validators/commercial-offer-validator';
import { useCommercialOfferController } from '../controllers/commercial-offer-controller';

const router = express.Router();
const commercialOfferController = useCommercialOfferController();
const commercialOfferValidator = useCommercialOfferValidator();

router.get('/', commercialOfferController.getCommercialOffers);
router.get('/:id', commercialOfferValidator.getCommercialOfferValidator, commercialOfferController.getCommercialOffer);
router.post(
  '/',
  commercialOfferValidator.createCommercialOfferValidator,
  commercialOfferController.createCommercialOffer
);
router.put(
  '/',
  commercialOfferValidator.updateCommercialOfferValidator,
  commercialOfferController.updateCommercialOffer
);

export default router;
