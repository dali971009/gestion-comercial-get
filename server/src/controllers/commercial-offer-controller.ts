import httpStatus from 'http-status';
import logger from '../config/logger';
import { useCommercialOfferService } from '../services/commercial-offer-service';

export const useCommercialOfferController = () => {
  const commercialOfferService = useCommercialOfferService();

  async function createCommercialOffer(req: any, res: any) {
    try {
      const commercialOffer = await commercialOfferService.createCommercialOffer(req.body);
      const { status, message, data } = commercialOffer.response;
      res.status(commercialOffer.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function updateCommercialOffer(req: any, res: any) {
    try {
      const commercialOffer = await commercialOfferService.updateCommercialOffer(req.body);
      const { status, message, data } = commercialOffer.response;
      res.status(commercialOffer.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function getCommercialOffer(req: any, res: any) {
    try {
      const commercialOffer = await commercialOfferService.getCommercialOfferByUuid(req.params.id);
      if (commercialOffer === null) {
        res.status(httpStatus.NOT_FOUND).send();
        return;
      }

      res.status(httpStatus.OK).send(commercialOffer);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function getCommercialOffers(req: any, res: any) {
    try {
      const commercialOffer = await commercialOfferService.getCommercialOffers();
      res.status(httpStatus.OK).send(commercialOffer);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  return { createCommercialOffer, updateCommercialOffer, getCommercialOffer, getCommercialOffers };
};
