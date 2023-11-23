import httpStatus from 'http-status';
import logger from '../config/logger';
import { useContractService } from '../services/contract-service';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import { Buffer } from 'buffer';
import { ContractType } from '../config/enums/contract-type';

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
            };
            delete req.body.createAt;
            req.body.oldVersions = {
              create: {
                ...supplement,
              },
            };
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

  async function getLogoImage() {
    const logoFilePath: string = '../assets/logo-get.jpg';
    const fileHandle: number = fs.openSync(__dirname + '/' + logoFilePath, 'r');

    const stats: fs.Stats = fs.fstatSync(fileHandle);
    const fileSize: number = stats.size;
    const imageBuffer: Buffer = Buffer.allocUnsafe(fileSize);

    fs.readSync(fileHandle, imageBuffer, 0, fileSize, 0);
    fs.closeSync(fileHandle);
    return imageBuffer;
  }

  async function printContract(req: any, res: any) {
    const contract = await contractService.getContractByUuid(req.params.id);
    if (contract === null) {
      res.status(httpStatus.NOT_FOUND).send();
      return;
    }

    // Convert HTML to PDF using PDF-LIB
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage();
    const page2 = pdfDoc.addPage();

    page.drawText('Example', {
      font,
    });

    const { width, height } = page.getSize();

    const logoImage = await getLogoImage();
    const embedJpg = await pdfDoc.embedJpg(logoImage);

    for (const page of pdfDoc.getPages()) {
      page.drawText(`UEB GET: DATOS`, {
        x: width - 215,
        y: height - 65,
        size: 15,
        color: rgb(0.2, 0.2, 0.2),
      });
      page.drawImage(embedJpg, {
        x: 100,
        y: height - 80,
        height: 40,
        width: 100,
      });
    }

    // Send the generated PDF as a response
    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    res.contentType('application/pdf');
    res.send(pdfBytes);
  }

  function getTypeName(type: ContractType) {
    switch (type) {
      case ContractType.CONTRACT_OF_SERVICE:
        return 'Contrato de prestación de servicios';
      case ContractType.LOAN_AGREEMENT:
        return 'Contrato de Comodato';
      case ContractType.PROJECT_DOCUMENTATION:
        return 'Documentación de Proyectos';
      case ContractType.EXECUTION_OF_WORK:
        return 'Ejecución de obras';
      case ContractType.LEASING_CONTRACT:
        return 'Contrato de Arrendamiento';
      default:
        return '';
    }
  }

  return { createContract, updateContract, getContract, getContracts, printContract };
};
