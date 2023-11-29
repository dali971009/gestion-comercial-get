import httpStatus from 'http-status';
import logger from '../config/logger';
import { useProductionReportService } from '../services/production-report-service';
import fs from "fs";
import {Buffer} from "buffer";
import {PDFDocument, rgb, StandardFonts} from "pdf-lib";

export const useProductionReportController = () => {
  const productionReportService = useProductionReportService();

  async function createProductionReport(req: any, res: any) {
    try {
      const productionReport = await productionReportService.createProductionReport(req.body);
      const { status, message, data } = productionReport.response;
      res.status(productionReport.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function updateProductionReport(req: any, res: any) {
    try {
      const productionReport = await productionReportService.updateProductionReport(req.body);
      const { status, message, data } = productionReport.response;
      res.status(productionReport.statusCode).send({ status, message, data });
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function getProductionReport(req: any, res: any) {
    try {
      const productionReport = await productionReportService.getProductionReportByUuid(req.params.id);
      if (productionReport === null) {
        res.status(httpStatus.NOT_FOUND).send();
        return;
      }

      res.status(httpStatus.OK).send(productionReport);
    } catch (e) {
      logger.error(e);
      res.status(httpStatus.BAD_GATEWAY).send(e);
    }
  }

  async function getProductionReports(req: any, res: any) {
    try {
      const productionReport = await productionReportService.getProductionReports();
      res.status(httpStatus.OK).send(productionReport);
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

  async function printInvoice(req: any, res: any) {
    const productionReport = await productionReportService.getProductionReportByUuid(req.params.id);
    if (productionReport === null) {
      res.status(httpStatus.NOT_FOUND).send();
      return;
    }

    // Convert HTML to PDF using PDF-LIB
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page1 = pdfDoc.addPage();

    const { width, height } = page1.getSize();

    page1.drawRectangle({
      x: 20,
      y: 50,
      width: width - 40,
      height: height - 100,
      color: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    page1.drawLine({
      color: rgb(0, 0, 0),
      thickness: 1,
      end: {x: width - 20, y: height - 110 },
      start: {x: 20, y: height - 110}
    })

    const logoImage = await getLogoImage('../assets/logo-get.png');
    const qrImage = await getLogoImage('../assets/qr.png');
    const logoEmbedPng = await pdfDoc.embedPng(logoImage);
    const qrEmbedPng = await pdfDoc.embedPng(qrImage);

    const title = 'Factura comercial';
    const ueb = 'UEB Datos';

    const titleWidth = font.widthOfTextAtSize(title.toUpperCase(), 20);
    const uebWidth = font.widthOfTextAtSize(ueb.toUpperCase(), 16);

    // print logo
    page1.drawImage(logoEmbedPng, {
      x: 40,
      y: height - 100,
      height: 40,
      width: 80,
    });
    // print title
    page1.drawText(title.toUpperCase(), {
      x: (width - titleWidth) / 2,
      y: height - 80,
      font,
      size: 20,
    });
    // print ueb
    page1.drawText(ueb.toUpperCase(), {
      x: (width - uebWidth) / 2,
      y: height - 100,
      font,
      size: 16,
    });

    // Send the generated PDF as a response
    const pdfBytes = await pdfDoc.saveAsBase64({ dataUri: true });
    res.contentType('application/pdf');
    res.send(pdfBytes);
  }

  return { createProductionReport, updateProductionReport, getProductionReport, getProductionReports, printInvoice };
};
