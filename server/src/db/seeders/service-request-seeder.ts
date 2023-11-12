import {Prisma} from "@prisma/client";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import {ServiceRequestStatus} from "../../config/enums/service-request-status";

export function serviceRequestData(clientId: string): Prisma.ServiceRequestCreateInput[] {
  return [
    {
      id: uuidv4(),
      number: 1,
      applicationDate: moment().subtract(5, 'hour').toISOString(),
      contactName: 'Alberto Ramírez',
      contactPosition: 'Director',
      contactEmail: 'alberto@gmail.com',
      scope: 'Necesito hospedar mi sitio web',
      status: ServiceRequestStatus.OFFER_OR_CONTRACT_PRESENTATION_PENDING,
      requestingEntity: {
        connect: {
          id: clientId,
        }
      }
    },
  ];
}
