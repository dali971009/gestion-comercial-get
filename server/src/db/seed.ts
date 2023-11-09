import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {UserEmailStatus, UserStatus} from "../config/enums/user-status";
import bcrypt from "bcryptjs";
import {ClientStatus} from "../config/enums/client-status";
import { serviceTypeData } from './seeders/service-type-seeder'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
    {
        id: uuidv4(),
        firstName: 'Admin',
        lastName: 'Admin2',
        email: 'admin@test.com',
        password: bcrypt.hashSync('admin12345', 8),
        address: '',
        status: UserStatus.ACTIVE,
        emailVerified: UserEmailStatus.VERIFIED,
        phoneNumber: '',
    },
]

const clientData: Prisma.ClientCreateInput[] = [
    {
        id: uuidv4(),
        officialName: 'Sucursal Marlin Cayo Largo del Sur',
        code: '115716',
        creationDate: new Date(),
        osdeGroupUnion: 'Test place',
        address: 'Cayo Largo del Sur, Los Canarreos',
        codeREEUP: '256.0.60655',
        nit: '30001501750',
        commercialRegister: 'Marinas',
        accountName: 'Cuenta CUP',
        bankAccount: '4068 9221 2173 40016',
        bank: 'Metropolitano',
        status: ClientStatus.ACTIVE,
        authorizedPeople: {
            create: {
                fullName: 'Ricardo Garcia',
                ci: '7894564123',
                position: 'Director',
                isMainStaff: true,
            },
        },
    },
]

async function main() {
    console.log(`Start seeding ...`)
    await prisma.token.deleteMany();
    await prisma.user.deleteMany();
    await prisma.clientContact.deleteMany();
    await prisma.client.deleteMany();
    await prisma.serviceType.deleteMany();

    for (const data of userData) {
        const user = await prisma.user.create({ data });
        console.log(`Created user with id: ${user.id}`);
    }
    for (const data of clientData) {
        const client = await prisma.client.create({ data });
        console.log(`Created client with id: ${client.id}`);
    }
    for (const data of serviceTypeData) {
        const serviceType = await prisma.serviceType.create({ data });
        console.log(`Created service type with id: ${serviceType.id}`);
    }

    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
