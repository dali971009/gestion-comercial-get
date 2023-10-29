import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import {UserEmailStatus, UserStatus} from "../config/enums/user-status";
import {where} from "sequelize";
import bcrypt from "bcryptjs";

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

async function main() {
    console.log(`Start seeding ...`)
    await prisma.user.deleteMany();
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        })
        console.log(`Created user with id: ${user.id}`)
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