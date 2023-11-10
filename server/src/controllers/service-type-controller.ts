import httpStatus from "http-status";
import logger from "../config/logger";
import {useServiceTypeService} from "../services/service-type-service";


export const useServiceTypeController = () => {
    const ServiceTypeService = useServiceTypeService();

    async function createServiceType(req: any, res: any) {
        try {
            const serviceType = await ServiceTypeService.createServiceType(req.body);
            const { status, message, data } = serviceType.response;
            res.status(serviceType.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function updateServiceType(req: any, res: any) {
        try {
            const serviceType = await ServiceTypeService.updateServiceType(req.body);
            const { status, message, data } = serviceType.response;
            res.status(serviceType.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServiceType(req: any, res: any) {
        try {
            const serviceType = await ServiceTypeService.getServiceTypeByUuid(req.params.id);
            if (serviceType === null) {
                res.status(httpStatus.NOT_FOUND).send();
                return;
            }

            res.status(httpStatus.OK).send(serviceType);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServiceTypes(req: any, res: any) {
        try {
            const serviceType = await ServiceTypeService.getServiceTypes();
            res.status(httpStatus.OK).send(serviceType);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServiceTypeLabels(req: any, res: any) {
        try {
            const serviceTypeLabels = await ServiceTypeService.getServiceTypesLabels();
            const labels = serviceTypeLabels.map(it => ({ title: it.name, value: it.id }));
            res.status(httpStatus.OK).send(labels);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }


    return { createServiceType, updateServiceType, getServiceType, getServiceTypes, getServiceTypeLabels }
}
