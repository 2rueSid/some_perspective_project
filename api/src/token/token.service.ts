import { Injectable } from '@nestjs/common';
import { Prisma, TokenTypes } from '@prisma/client';
import { addDays } from 'date-fns';

import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  async createJwtToken(
    token: string,
    userId: number,
    expired?: Date,
  ): Promise<string> {
    const expiresAt = expired ? expired : addDays(new Date(), 2);

    await this.deleteToken({
      user_id: userId,
      type: TokenTypes.AUTHORIZATION,
    });

    await this.prisma.userTokens.create({
      data: {
        token,
        type: TokenTypes.AUTHORIZATION,
        lifetime: expiresAt,
        user_id: userId,
      },
    });

    return token;
  }

  async deleteToken(where: Prisma.UserTokensWhereInput) {
    await this.prisma.userTokens.deleteMany({ where });
  }
}
