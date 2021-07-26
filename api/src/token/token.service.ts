import { Injectable } from '@nestjs/common';
import { Prisma, TokenTypes, UserTokens } from '@prisma/client';
import { addDays } from 'date-fns';
import * as cryptoRandomString from 'crypto-random-string';

import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class TokenService {
  constructor(private readonly prisma: PrismaService) {}

  TOKEN_LENGTH = 8;

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

  async createToken(
    userId: number,
    type: TokenTypes,
    expired?: Date,
  ): Promise<UserTokens> {
    const expiresAt = expired ? expired : addDays(new Date(), 7);
    const token = await cryptoRandomString({
      length: this.TOKEN_LENGTH,
      type: 'url-safe',
    });

    await this.deleteToken({
      user_id: userId,
      type: type,
    });

    return await this.prisma.userTokens.create({
      data: {
        token,
        type: TokenTypes.AUTHORIZATION,
        lifetime: expiresAt,
        user_id: userId,
      },
    });
  }

  async deleteToken(where: Prisma.UserTokensWhereInput) {
    await this.prisma.userTokens.deleteMany({ where });
  }
}
