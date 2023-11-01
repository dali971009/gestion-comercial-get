import httpStatus from "http-status";
import logger from "../config/logger";
import {useClientService} from "../services/client-service";


export const useClientController = () => {
    const clientService = useClientService();
    
    async function createClient(req: any, res: any) {
        try {
            const client = await clientService.createClient(req.body);
            const { status, message, data } = client.response;
            res.status(client.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function updateClient(req: any, res: any) {
        try {
            const client = await clientService.updateClient(req.body);
            const { status, message, data } = client.response;
            res.status(client.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getClient(req: any, res: any) {
        try {
            const client = await clientService.getClientByUuid(req.body.id);
            res.status(httpStatus.OK).send(client);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getAllClients(req: any, res: any) {
        try {
            const client = await clientService.getClients();
            res.status(httpStatus.OK).send(client);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    return { createClient, updateClient, getClient, getAllClients }
}
