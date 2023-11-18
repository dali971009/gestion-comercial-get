import httpStatus from 'http-status';
import { v4 as uuidV4 } from 'uuid';
import responseHandler from '../helper/response-handler';
import logger from '../config/logger';
import { Prisma, PrismaClient } from '@prisma/client';
import moment from 'moment';

export const useServiceRequestService = () => {
  const prisma = new PrismaClient();

  async function createServiceRequest(serviceRequestBody: any) {
    try {
      serviceRequestBody.id = uuidV4();

      let serviceRequestData = await prisma.serviceRequest.create({
        data: serviceRequestBody,
      });

      if (!serviceRequestData) {
        return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
      }

      return responseHandler.returnSuccess(httpStatus.CREATED, 'success', serviceRequestData);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
    }
  }

  async function getServiceRequests() {
    return prisma.serviceRequest.findMany({
      orderBy: {
        applicationDate: Prisma.SortOrder.desc,
      },
    });
  }

  async function getServiceRequestByUuid(uuid: string) {
    return prisma.serviceRequest.findUnique({
      where: {
        id: uuid,
      },
    });
  }

  async function updateServiceRequest(serviceRequestBody: any) {
    try {
      let serviceRequestData = await prisma.serviceRequest.update({
        data: serviceRequestBody,
        where: {
          id: serviceRequestBody.id,
        },
      });
      if (!serviceRequestData) {
        return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
      }
      return responseHandler.returnSuccess(httpStatus.OK, 'success', serviceRequestData);
    } catch (e) {
      logger.error(e);
      return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
    }
  }

  async function getServiceRequestIds() {
    return prisma.serviceRequest.findMany({
      select: {
        id: true,
      },
    });
  }

  async function getServiceRequestByYear() {
    return prisma.serviceRequest.findMany({
      select: {
        number: true,
      },
      where: {
        applicationDate: {
          gte: moment().startOf('year').toDate(),
          lte: moment().endOf('year').toDate(),
        },
      },
    });
  }

  return {
    createServiceRequest,
    updateServiceRequest,
    getServiceRequestByUuid,
    getServiceRequests,
    getServiceRequestIds,
    getServiceRequestByYear,
  };
};
