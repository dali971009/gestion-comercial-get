import httpStatus from 'http-status';
import { v4 as uuidV4 } from 'uuid';
import responseHandler from '../helper/response-handler';
import logger from '../config/logger';
import { PrismaClient } from '@prisma/client';

export const useProductionReportService = () => {
  const prisma = new PrismaClient();

  async function createProductionReport(productionReportBody: any) {
    try {
      productionReportBody.id = uuidV4();
      const services = productionReportBody.services;
      productionReportBody.services = {
        createMany: {
          // @ts-ignore
          data: [...services.map(it => ({ ...it, id: uuidV4(), quantity: parseInt(it.quantity) }))],
        },
      };

      let productionReportData = await prisma.productionReport.create({
        data: productionReportBody,
      });

      if (!productionReportData) {
        return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
      }

      return responseHandler.returnSuccess(httpStatus.CREATED, 'success', productionReportData);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
    }
  }

  async function getProductionReports() {
    return prisma.productionReport.findMany();
  }

  async function getProductionReportByUuid(uuid: string) {
    return prisma.productionReport.findUnique({
      where: {
        id: uuid,
      },
      include: {
        services: true,
      },
    });
  }

  async function updateProductionReport(productionReportBody: any) {
    try {
      const services = productionReportBody.services;
      delete productionReportBody.services;
      await prisma.productionReportService.deleteMany({
        where: {
          productionReportId: productionReportBody.id,
        },
      });
      await prisma.productionReportService.createMany({
        data: [
          // @ts-ignore
          ...services.map(it => ({
            ...it,
            id: uuidV4(),
            productionReportId: productionReportBody.id,
            quantity: parseInt(it.quantity),
          })),
        ],
      });

      let productionReportData = await prisma.productionReport.update({
        data: productionReportBody,
        where: {
          id: productionReportBody.id,
        },
      });
      if (!productionReportData) {
        return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'success', productionReportData);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
    }
  }

  async function getProductionReportIds() {
    return prisma.productionReport.findMany({
      select: {
        id: true,
      },
    });
  }

  return {
    createProductionReport,
    updateProductionReport,
    getProductionReportByUuid,
    getProductionReports,
    getProductionReportIds,
  };
};
