import { Prisma, PrismaClient } from '@prisma/client';
import { TokenType } from '../config/enums/token-type';

class TokenDao {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  async create(data: any) {
    return this.prismaClient.token.create({ data });
  }

  async bulkCreate(tokens: any[]) {
    return this.prismaClient.token.createMany({ data: tokens });
  }

  async findOne(where: any) {
    return this.prismaClient.token.findFirst({ where });
  }

  async remove(where: Prisma.TokenWhereInput | undefined) {
    return this.prismaClient.token.deleteMany({ where });
  }

  async removeExpiredToken(type: TokenType) {
    return this.prismaClient.token.deleteMany({
      where: {
        expires: {
          lt: new Date(),
        },
        type,
      },
    });
  }
}

export default TokenDao;
