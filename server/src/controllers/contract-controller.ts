import httpStatus from "http-status";
import logger from "../config/logger";
import {useContractService} from "../services/contract-service";


export const useContractController = () => {
    const contractService = useContractService();

    async function createContract(req: any, res: any) {
        try {
            const contract = await contractService.createContract(req.body);
            const { status, message, data } = contract.response;
            res.status(contract.statusCode).send({ status, message, data });
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function updateContract(req: any, res: any) {
        try {
            if (req.body.isPreform) {
              const contract = await contractService.updateContract(req.body);
              const { status, message, data } = contract.response;
              res.status(contract.statusCode).send({ status, message, data });
            } else {
                const oldContract = await contractService.getContractByUuid(req.body.id);
                if (oldContract) {
                  if (oldContract.isPreform) {
                    const contract = await contractService.updateContract(req.body);
                    const { status, message, data } = contract.response;
                    res.status(contract.statusCode).send({ status, message, data });
                  } else {
                    const supplement = {
                      createAt: oldContract.createAt,
                      identificationOfTheParts: oldContract.identificationOfTheParts,
                      object: oldContract.object,
                      value: oldContract.value,
                      type: oldContract.type,
                      includeCL: oldContract.includeCL,
                      agreedAdvance: oldContract.agreedAdvance,
                      wayToPay: oldContract.wayToPay,
                      signatureDate: oldContract.signatureDate,
                      validity: oldContract.validity,
                      legalOpinion: oldContract.legalOpinion,
                      agreement: oldContract.agreement,
                      observations: oldContract.observations,
                    }
                    delete req.body.createAt;
                    req.body.oldVersions = {
                      create: {
                        ...supplement,
                      }
                    }
                    console.log('supplement', supplement);
                    console.log('body', req.body);
                    const contract = await contractService.updateContract(req.body);
                    const { status, message, data } = contract.response;
                    res.status(contract.statusCode).send({ status, message, data });
                  }
                } else {
                  throw new Error('Contract not found');
                }

            }
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getContract(req: any, res: any) {
        try {
            const contract = await contractService.getContractByUuid(req.params.id);
            if (contract === null) {
                res.status(httpStatus.NOT_FOUND).send();
                return;
            }

            res.status(httpStatus.OK).send(contract);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }

    async function getContracts(req: any, res: any) {
        try {
            const contract = await contractService.getContracts();
            res.status(httpStatus.OK).send(contract);
        } catch (e) {
            logger.error(e);
            res.status(httpStatus.BAD_GATEWAY).send(e);
        }
    }


    return { createContract, updateContract, getContract, getContracts }
}
