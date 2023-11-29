import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export function productionReportData(): Prisma.ProductionReportCreateInput[] {
  return [
    {
      id: uuidv4(),
      area: 'UEB Datos',
      month: 0,
      incomePlan: '20.0',
      services: {
        createMany: {
          data: [],
        }
      },
      staff: {
        createMany: {
          data: [],
        }
      },
      totalAmount: '1300.0',
    },
  ];
}
