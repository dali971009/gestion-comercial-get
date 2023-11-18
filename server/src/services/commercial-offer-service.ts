import httpStatus from 'http-status';
import { v4 as uuidV4 } from 'uuid';
import responseHandler from '../helper/response-handler';
import logger from '../config/logger';
import { PrismaClient } from '@prisma/client';

export const useCommercialOfferService = () => {
  const prisma = new PrismaClient();

  async function createCommercialOffer(commercialOfferBody: any) {
    try {
      commercialOfferBody.id = uuidV4();
      const services = commercialOfferBody.services;
      commercialOfferBody.services = {
        createMany: {
          // @ts-ignore
          data: [...services.map(it => ({ ...it, id: uuidV4(), quantity: parseInt(it.quantity) }))],
        },
      };

      let commercialOfferData = await prisma.commercialOffer.create({
        data: commercialOfferBody,
      });

      if (!commercialOfferData) {
        return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
      }

      return responseHandler.returnSuccess(httpStatus.CREATED, 'success', commercialOfferData);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
    }
  }

  async function getCommercialOffers() {
    return prisma.commercialOffer.findMany({
      include: {
        services: true,
        client: true,
      },
    });
  }

  async function getCommercialOfferByUuid(uuid: string) {
    return prisma.commercialOffer.findUnique({
      where: {
        id: uuid,
      },
      include: {
        services: true,
      },
    });
  }

  async function updateCommercialOffer(commercialOfferBody: any) {
    try {
      const services = commercialOfferBody.services;
      delete commercialOfferBody.services;
      await prisma.commercialOfferService.deleteMany({
        where: {
          commercialOfferId: commercialOfferBody.id,
        },
      });
      await prisma.commercialOfferService.createMany({
        data: [
          // @ts-ignore
          ...services.map(it => ({
            ...it,
            id: uuidV4(),
            commercialOfferId: commercialOfferBody.id,
            quantity: parseInt(it.quantity),
          })),
        ],
      });

      let commercialOfferData = await prisma.commercialOffer.update({
        data: commercialOfferBody,
        where: {
          id: commercialOfferBody.id,
        },
      });
      if (!commercialOfferData) {
        return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'success', commercialOfferData);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
    }
  }

  async function getCommercialOfferIds() {
    return prisma.commercialOffer.findMany({
      select: {
        id: true,
      },
    });
  }

  return {
    createCommercialOffer,
    updateCommercialOffer,
    getCommercialOfferByUuid,
    getCommercialOffers,
    getCommercialOfferIds,
  };
};
