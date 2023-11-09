import {Prisma} from "@prisma/client";
import {v4 as uuidv4} from "uuid";

export const serviceTypeData: Prisma.ServiceTypeCreateInput[] = [
  {
    id: uuidv4(),
    name: 'TXD',
    services: {
      createMany: {
        data: [],
      }
    }
  },
  {
    id: uuidv4(),
    name: 'Salva digital',
    services: {
      createMany: {
        data: [],
      }
    }
  },
  {
    id: uuidv4(),
    name: 'Hospedaje',
    services: {
      createMany: {
        data: [],
      }
    }
  },
  {
    id: uuidv4(),
    name: 'Video conferencia',
    services: {
      createMany: {
        data: [],
      }
    }
  },
  {
    id: uuidv4(),
    name: 'Seguridad informática',
    services: {
      createMany: {
        data: [],
      }
    }
  },
  {
    id: uuidv4(),
    name: 'Asistencia técnica especializada',
    services: {
      createMany: {
        data: [],
      }
    }
  },
]
