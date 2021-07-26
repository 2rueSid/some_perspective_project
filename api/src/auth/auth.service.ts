import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as cryptoRandomString from 'crypto-random-string';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import { UserSignUpInput } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(private readonly prisma: PrismaService) {}

  async signUp({ password, ...userData }: UserSignUpInput): Promise<User> {
    const user = await UserModel({ email: userData.email });

    if (user.exists) {
      throw new HttpException('User already exists', 403);
    }

    const slug = await this.generateSlug(6);
    const hashedPassword = await this.hashPassword(password);

    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
        slug,
        password: hashedPassword,
      },
    });

    return createdUser;
  }

  private async generateSlug(length: number, type?): Promise<string> {
    return await cryptoRandomString({
      length: length,
      type: type ? type : 'url-safe',
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
