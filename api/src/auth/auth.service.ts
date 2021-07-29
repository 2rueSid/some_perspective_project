import { HttpException, Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';
import { TokenTypes, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import {
  ActivateUserInput,
  CreateResetToken,
  ResetPasswordTokenDto,
  ResetUserPassword,
  UserOutputDto,
  UserSignInInput,
  UserSignUpInput,
} from './auth.dto';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { TokenModel } from 'src/token/token.model';
import { generateSlug } from 'src/utils/generate_slug';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly searchService: SearchService,
  ) {}

  async signUp({
    password,
    ...userData
  }: UserSignUpInput): Promise<UserOutputDto> {
    const user = await UserModel({ email: userData.email });

    if (user.exists) throw new HttpException('User already exists', 401);

    const slug = await generateSlug(6);
    const hashedPassword = await this.hashPassword(password);

    const createdUser = await this.prisma.user.create({
      data: {
        ...userData,
        slug,
        password: hashedPassword,
      },
    });

    await this.sendActivationEmail(createdUser);
    await this.searchService.addUserToSearchTable({
      searchable: createdUser.first_name,
      searchable_id: createdUser.id,
    });

    return await this.generateLoginPayload(createdUser, false);
  }

  async signIn({
    email,
    password,
    remember_me,
  }: UserSignInInput): Promise<UserOutputDto> {
    const user = await UserModel({ email });

    if (!user.exists) throw new HttpException('Not Found!', 404);

    if (!user.comparePasswords(password))
      throw new HttpException('Invalid data', 403);

    return await this.generateLoginPayload(user, remember_me);
  }

  async activateAccount({
    activate_token,
  }: ActivateUserInput): Promise<UserOutputDto> {
    const { user, ...token } = await TokenModel({ token: activate_token });

    if (!token.is_valid)
      throw new HttpException('Bad request. Token has expired', 403);

    await this.prisma.userTokens.delete({ where: { id: token.id } });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    return await this.generateLoginPayload(user);
  }

  async resetPassword({
    password,
    reset_token,
  }: ResetUserPassword): Promise<UserOutputDto> {
    const { user, ...token } = await TokenModel({ token: reset_token });

    if (!token.is_valid)
      throw new HttpException('Bad request. Token has expired', 403);

    await this.prisma.userTokens.delete({ where: { id: token.id } });

    const hashedPassword = await this.hashPassword(password);

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return await this.generateLoginPayload(updatedUser);
  }

  async createResetToken({
    email,
  }: CreateResetToken): Promise<ResetPasswordTokenDto> {
    const user = await UserModel({ email });

    if (!user.exists) throw new HttpException('Not Found', 404);

    const { token } = await this.tokenService.createToken(
      user.id,
      TokenTypes.RESET_PASSWORD,
    );

    return { token };
  }

  private async sendActivationEmail(
    user: User,
  ): Promise<ResetPasswordTokenDto> {
    const { token } = await this.tokenService.createToken(
      user.id,
      TokenTypes.ACTIVATE_EMAIL,
    );

    return { token };
  }

  private async generateLoginPayload(
    user: User,
    remember_me?: boolean,
  ): Promise<UserOutputDto> {
    const expiresAt = remember_me && addDays(new Date(), 30);

    if (user.password) delete user.password;

    const token = await this.jwtService.sign(
      { email: user.email, id: user.id, role: user.role, slug: user.slug },
      { expiresIn: '30d' },
    );
    await this.tokenService.createJwtToken(token, user.id, expiresAt);

    return { authorization_token: token, ...user };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }
}
