import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

import { PrismaService } from './prisma_client/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = this.prisma.user.findUnique({ where });

    return user;
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    console.log(data);

    return this.prisma.user.create({
      data,
    });
  }
}
