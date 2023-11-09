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
            const client = await clientService.updateClient(req.params.id, req.body);
            const { status, message, data } = client.response;
            res.status(client.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getClient(req: any, res: any) {
        try {
            const client = await clientService.getClientByUuid(req.params.id);
            if (client === null) {
                res.status(httpStatus.NOT_FOUND).send();
                return;
            }

            const response = { ...client };
            const authorizedPeople  = client!.authorizedPeople;
            // @ts-ignore
            delete response.authorizedPeople;

            const staff = {};

            const indexDirector = authorizedPeople.findIndex(it => it.position === 'Director' && it.isMainStaff);
            if (indexDirector !== -1) {
                // @ts-ignore
                staff.director = authorizedPeople[indexDirector];
                authorizedPeople.splice(indexDirector, 1);
            }
            const indexEconomic = authorizedPeople.findIndex(it => it.position === 'Económico' && it.isMainStaff);
            if (indexEconomic !== -1) {
                // @ts-ignore
                staff.economic = authorizedPeople[indexEconomic];
                authorizedPeople.splice(indexEconomic, 1);
            }
            const indexItPerson = authorizedPeople.findIndex(it => it.position === 'Informático' && it.isMainStaff);
            if (indexItPerson !== -1) {
                // @ts-ignore
                staff.itPerson = authorizedPeople[indexItPerson];
                authorizedPeople.splice(indexItPerson, 1);
            }

            // @ts-ignore
            staff.authorizedPeople = [ ...authorizedPeople ];

            console.log({ ...response, staff });
            res.status(httpStatus.OK).send({ ...response, staff });
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
