import httpStatus from "http-status";
import {v4 as uuidV4} from "uuid";
import responseHandler from "../helper/response-handler";
import logger from "../config/logger";
import {Prisma, PrismaClient} from "@prisma/client";

export const useContractService = () => {
    const prisma = new PrismaClient();

    async function createContract(contractBody: any) {
        try {
            contractBody.id = uuidV4();

            let contractData = await prisma.contract.create({
                data: contractBody
            });

            if (!contractData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, 'success', contractData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    async function getContracts() {
        return prisma.contract.findMany({
            orderBy: {
                number: Prisma.SortOrder.desc,
            }
        });
    }

    async function getContractByUuid(uuid: string) {
        return prisma.contract.findUnique({
            include: {
              oldVersions: true,
            },
            where: {
                id: uuid,
            },
        });
    }

    async function updateContract(contractBody: any) {
        try {
            let contractData = await prisma.contract.update({
                data: contractBody,
                where: {
                    id: contractBody.id,
                }
            });
            if (!contractData) {
                return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
            }
            return responseHandler.returnSuccess(httpStatus.OK, 'success', contractData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.INTERNAL_SERVER_ERROR, 'failed');
        }
    }

    async function getContractIds() {
      return prisma.contract.findMany({
        select: {
          id: true,
        }
      })
    }

    return { createContract, updateContract, getContractByUuid, getContracts, getContractIds }
}
