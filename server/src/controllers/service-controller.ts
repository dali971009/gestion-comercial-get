import httpStatus from "http-status";
import logger from "../config/logger";
import {useServiceService} from "../services/service-service";

export const useServiceController = () => {
    const serviceService = useServiceService();

    async function createService(req: any, res: any) {
        try {
            const service = await serviceService.createService(req.body);
            const { status, message, data } = service.response;
            res.status(service.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function updateService(req: any, res: any) {
        try {
            const service = await serviceService.updateService(req.body);
            const { status, message, data } = service.response;
            res.status(service.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getService(req: any, res: any) {
        try {
            const service = await serviceService.getServiceByUuid(req.params.id);
            if (service === null) {
                res.status(httpStatus.NOT_FOUND).send();
                return;
            }

            res.status(httpStatus.OK).send(service);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServices(req: any, res: any) {
        try {
            const service = await serviceService.getServices();
            res.status(httpStatus.OK).send(service);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServiceLabels(req: any, res: any) {
        try {
            const services = await serviceService.getServices();
            const serviceLabels = [];
            for (const serviceType of services) {
                for (const service of serviceType.services) {
                    if (serviceType.serviceDescription) {
                        service.description = `${serviceType.description}: ${serviceType.serviceDescription} (${service.description})`;
                    } else {
                        service.description = `${serviceType.description}: ${service.description}`;
                    }
                    serviceLabels.push(service);
                }
            }
            res.status(httpStatus.OK).send(serviceLabels);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    return { createService, updateService, getService, getServices, getServiceLabels }
}
