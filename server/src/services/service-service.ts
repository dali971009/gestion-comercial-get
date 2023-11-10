import httpStatus from "http-status";
import {v4 as uuidV4} from "uuid";
import responseHandler from "../helper/response-handler";
import logger from "../config/logger";
import {Prisma, PrismaClient} from "@prisma/client";

export const useServiceService = () => {
    const prisma = new PrismaClient();

    async function createService(serviceBody: any) {
        try {
            serviceBody.id = uuidV4();

            let serviceData = await prisma.service.create({
                data: serviceBody
            });

            if (!serviceData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, 'success', serviceData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    async function getServices() {
        return prisma.serviceType.findMany({
          orderBy: {
            name: Prisma.SortOrder.asc,
          },
          include: {
            services: true,
          }
        });
    }

    async function getServiceByUuid(uuid: string) {
        return prisma.service.findUnique({
            where: {
                id: uuid,
            },
        });
    }

    async function updateService(serviceBody: any) {
        try {
            let serviceData = await prisma.service.update({
                data: serviceBody,
                where: {
                    id: serviceBody.id,
                }
            });
            if (!serviceData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }
            return responseHandler.returnSuccess(httpStatus.OK, 'success', serviceData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    return { createService, updateService, getServiceByUuid, getServices }
}
