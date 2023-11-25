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

  async function getLogoImage(path: string) {
    const fileHandle: number = fs.openSync(__dirname + '/' + path, 'r');

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
    const frontPage = pdfDoc.addPage();
    const page2 = pdfDoc.addPage();

    const { width, height } = frontPage.getSize();

    const logoImage = await getLogoImage('../assets/logo-get.png');
    const qrImage = await getLogoImage('../assets/qr.png');
    const logoEmbedPng = await pdfDoc.embedPng(logoImage);
    const qrEmbedPng = await pdfDoc.embedPng(qrImage);

    for (let i = 1; i < pdfDoc.getPages().length; i++) {
      const page = pdfDoc.getPage(i);
      page.drawImage(logoEmbedPng, {
        x: 100,
        y: height - 80,
        height: 40,
        width: 100,
      });
      page.drawText(`UEB GET: DATOS`, {
        x: width - 215,
        y: height - 65,
        size: 15,
        color: rgb(0.2, 0.2, 0.2),
      });
    }

    const title = 'Contrato de comodato';
    const number = 'No. AA-BBB-CC-DDD';
    const clientName = 'Cliente: _______________________________';
    const clientNumber = 'No. del Cliente: ___________';
    const ueb = 'UEB GET: _______________';
    const address = 'Calle O No. 157 e/ 23 y Humboldt, Vedado, Plaza de la Revolución, La Habana. Cuba.';
    const phone = 'Teléf.: +537 3677577, +537 8378423.   Callcenter: 18800';
    const email = 'E-mail: cac@get.tur.cu    Sitio Web: http://get.tur.cu';

    const titleWidth = font.widthOfTextAtSize(title.toUpperCase(), 28);
    const numberWidth = font.widthOfTextAtSize(number.toUpperCase(), 20);
    const clientNameWidth = font.widthOfTextAtSize(clientName, 16);
    const clientNumberWidth = font.widthOfTextAtSize(clientNumber, 13);
    const uebWidth = font.widthOfTextAtSize(ueb, 16);
    const addressWidth = font.widthOfTextAtSize(address, 9);
    const phoneWidth = font.widthOfTextAtSize(phone, 9);
    const emailWidth = font.widthOfTextAtSize(email, 9);

    // print logo
    frontPage.drawImage(logoEmbedPng, {
      x: (width - 160) / 2,
      y: height - 120,
      height: 60,
      width: 160,
    });
    // print title
    frontPage.drawText(title.toUpperCase(), {
      x: (width - titleWidth) / 2,
      y: height - 220,
      font,
      size: 28,
    });
    // print number
    frontPage.drawText(number.toUpperCase(), {
      x: (width - numberWidth) / 2,
      y: height - 300,
      font,
      size: 20,
    });
    // print client name
    frontPage.drawText(clientName, {
      x: (width - clientNameWidth) / 2,
      y: height - 380,
      font,
      size: 16,
    });
    // print client number
    frontPage.drawText(clientNumber, {
      x: (width - clientNameWidth) / 2 + clientNameWidth - clientNumberWidth,
      y: height - 440,
      font,
      size: 13,
    });
    // print ueb
    frontPage.drawText(ueb, {
      x: (width - uebWidth) / 2,
      y: height - 540,
      font,
      size: 16,
    });

    const spaceBetweenQrAndText = 15;
    const qrWidth = 40;
    const qrX = (width - (qrWidth + spaceBetweenQrAndText + addressWidth)) / 2;
    const footerTextX = qrX + qrWidth + spaceBetweenQrAndText;

    // print qr
    frontPage.drawImage(qrEmbedPng, {
      x: qrX,
      y: 50,
      height: qrWidth,
      width: qrWidth,
    });
    // print address
    frontPage.drawText(address, {
      x: footerTextX,
      y: 80,
      font,
      size: 9,
    });
    // print address
    frontPage.drawText(phone, {
      x: footerTextX,
      y: 65,
      font,
      size: 9,
    });
    // print address
    frontPage.drawText(email, {
      x: footerTextX,
      y: 50,
      font,
      size: 9,
    });

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
