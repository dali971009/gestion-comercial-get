import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceFrequency } from '../../config/enums/service-invoice-frequency';

export const serviceTypeData: Prisma.ServiceTypeCreateInput[] = [
  {
    id: uuidv4(),
    name: 'TXD',
    description: 'Servicios de transmisión de datos',
    services: {
      createMany: {
        data: [
          {
            id: uuidv4(),
            description: 'Conmutado (Una (1) Cuenta de Correo)',
            unit: 'Enlaces x Mes',
            price: 197.88,
          },
          {
            id: uuidv4(),
            description: 'Conmutado (Servidor de Correo)',
            unit: 'Enlaces x Mes',
            price: 247.35,
          },
          {
            id: uuidv4(),
            description: 'Sobre redes propias',
            unit: 'Enlaces x Mes',
            price: 1131.99,
          },
          {
            id: uuidv4(),
            description: 'Sobre linea arrendada (64 Kbps)',
            unit: 'Enlaces x Mes',
            price: 420.0,
            extraDescription: 'TxD L/A Navegación y Correo Nacional e Internacional',
            frequency: InvoiceFrequency.MONTHLY,
          },
        ],
      },
    },
  },
  {
    id: uuidv4(),
    name: 'Salva digital',
    description: 'Servicios de salva de información dígital',
    serviceDescription: 'Capacidad de almacenamiento',
    services: {
      createMany: {
        data: [
          {
            id: uuidv4(),
            description: 'Hasta  10 GB',
            unit: 'GB',
            price: 70.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Más de 10GB y hasta 20 GB',
            unit: 'GB',
            price: 140.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Más de 20 GB y hasta 60 GB',
            unit: 'GB',
            price: 406.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Más de 60 GB y hasta 100 GB',
            unit: 'GB',
            price: 665.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Más de 100 y hasta 200 GB',
            unit: 'GB',
            price: 1330.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Más de 200 GB y hasta 500 GB',
            unit: 'GB',
            price: 3325.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Más de 500GB y hasta 1 TB',
            unit: 'GB',
            price: 6790.0,
            frequency: InvoiceFrequency.MONTHLY,
          },
        ],
      },
    },
  },
  {
    id: uuidv4(),
    name: 'Hospedaje',
    description: 'Servicios de hospedaje de servidores virtuales dedicados contratados',
    services: {
      createMany: {
        data: [
          {
            id: uuidv4(),
            description: 'Instalación y activación del servidor VPS (Cuota única)',
            price: 538.92,
            frequency: InvoiceFrequency.MONTHLY,
          },
          {
            id: uuidv4(),
            description: 'Hospedaje de servidor virtual dedicado (Tarifa igual al 15% Configuración VPS)',
            frequency: InvoiceFrequency.MONTHLY,
          },
        ],
      },
    },
  },
  {
    id: uuidv4(),
    name: 'Video conferencia',
    services: {
      createMany: {
        data: [],
      },
    },
  },
  {
    id: uuidv4(),
    name: 'Seguridad informática',
    services: {
      createMany: {
        data: [],
      },
    },
  },
  {
    id: uuidv4(),
    name: 'Asistencia técnica especializada',
    services: {
      createMany: {
        data: [],
      },
    },
  },
];
