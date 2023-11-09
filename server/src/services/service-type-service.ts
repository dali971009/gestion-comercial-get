import httpStatus from "http-status";
import {v4 as uuidV4} from "uuid";
import responseHandler from "../helper/response-handler";
import logger from "../config/logger";
import {PrismaClient} from "@prisma/client";

export const useServiceTypeService = () => {
    const prisma = new PrismaClient();

    async function createServiceType(serviceTypeBody: any) {
        try {
            serviceTypeBody.id = uuidV4();

            let serviceTypeData = await prisma.serviceType.create({
                data: serviceTypeBody
            });

            if (!serviceTypeData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, 'success', serviceTypeData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    async function getServiceTypes() {
        return prisma.serviceType.findMany();
    }

    async function getServiceTypeByUuid(uuid: string) {
        return prisma.serviceType.findUnique({
            where: {
                id: uuid,
            },
        });
    }

    async function updateServiceType(serviceTypeBody: any) {
        try {
            let serviceTypeData = await prisma.serviceType.update({
                data: serviceTypeBody,
                where: {
                    id: serviceTypeBody.id,
                }
            });
            if (!serviceTypeData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }
            return responseHandler.returnSuccess(httpStatus.OK, 'success', serviceTypeData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    return { createServiceType, updateServiceType, getServiceTypeByUuid, getServiceTypes }
}
