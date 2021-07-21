import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(data: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id: 1 } });
  }
}
