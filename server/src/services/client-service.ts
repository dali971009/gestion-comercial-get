import {v4 as uuidV4} from "uuid";
import {PrismaClient} from "@prisma/client";
import {ClientStatus} from "../config/enums/client-status";
import responseHandler from "../helper/response-handler";
import httpStatus from "http-status";
import logger from "../config/logger";

export const useClientService = () => {
    const prisma = new PrismaClient();

    async function getClients() {
        return prisma.client.findMany();
    }

    async function createClient(clientBody: any) {
        try {
            let message = 'Successfully created client!';
            clientBody.id = uuidV4();
            clientBody.status = ClientStatus.ACTIVE;

            let clientData = await prisma.client.create(clientBody);

            if (!clientData) {
                message = 'Couldn\'t create the client';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, message, clientData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }

    async function getClientByUuid(uuid: string) {
        return prisma.client.findUnique({
            where: {
                id: uuid,
            },
        });
    }

    async function updateClient(clientBody: any) {
        try {
            let message = 'Successfully updated client!';
            let clientData = await prisma.client.update(clientBody);

            if (!clientData) {
                message = 'Couldn\'t update the client';
                return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
            }

            return responseHandler.returnSuccess(httpStatus.CREATED, message, clientData);
        } catch (e) {
            logger.error(e);
            return responseHandler.returnError(httpStatus.BAD_REQUEST, 'Something went wrong!');
        }
    }

    return { getClients, createClient, getClientByUuid, updateClient }
}