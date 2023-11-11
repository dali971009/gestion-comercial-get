import httpStatus from "http-status";
import logger from "../config/logger";
import {useServiceRequestService} from "../services/service-request-service";


export const useServiceRequestController = () => {
    const serviceRequestService = useServiceRequestService();

    async function createServiceRequest(req: any, res: any) {
        try {
            const numbers = await serviceRequestService.getServiceRequestByYear();
            req.body.number = 1;
            if (numbers.length > 0) {
                req.body.number = numbers[0].number + 1;
            }
            const serviceRequest = await serviceRequestService.createServiceRequest(req.body);
            const { status, message, data } = serviceRequest.response;
            res.status(serviceRequest.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function updateServiceRequest(req: any, res: any) {
        try {
            const serviceRequest = await serviceRequestService.updateServiceRequest(req.body);
            const { status, message, data } = serviceRequest.response;
            res.status(serviceRequest.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServiceRequest(req: any, res: any) {
        try {
            const serviceRequest = await serviceRequestService.getServiceRequestByUuid(req.params.id);
            if (serviceRequest === null) {
                res.status(httpStatus.NOT_FOUND).send();
                return;
            }

            res.status(httpStatus.OK).send(serviceRequest);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getServiceRequests(req: any, res: any) {
        try {
            const serviceRequest = await serviceRequestService.getServiceRequests();
            res.status(httpStatus.OK).send(serviceRequest);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }


    return { createServiceRequest, updateServiceRequest, getServiceRequest, getServiceRequests }
}
