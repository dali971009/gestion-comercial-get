import {PrismaClient} from "@prisma/client";

class UserDao {
    private prismaClient: PrismaClient;

    constructor() {
        this.prismaClient = new PrismaClient();
    }

    async findByEmail(email: string) {
        return this.prismaClient.user.findUnique({
            where: {
                email
            }
        });
    }

    /* async isEmailExists(email: string) {
        return User.count({ where: { email } }).then((count: number) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }*/

    /* async createWithTransaction(user: any, transaction: any) {
        return User.create(user, { transaction });
    }*/
}

export default UserDao;
