import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserOutputDto } from 'src/auth/auth.dto';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserUpdateInput } from './user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly saltRounds = 10;

  async updateUserProfile(
    data: UserUpdateInput,
    user: Partial<User>,
  ): Promise<Partial<UserOutputDto>> {
    const userToUpdate = await UserModel({ id: user.id });

    if (userToUpdate.isDeleted) {
      throw new HttpException('Not Found', 404);
    }

    return await userToUpdate.update(data);
  }

  async changePassword(
    { password }: Partial<UserUpdateInput>,
    user: Partial<User>,
  ): Promise<Partial<UserOutputDto>> {
    const hashed = await this.hashPassword(password);

    return await this.updateUserProfile({ password: hashed }, user);
  }

  async changeEmail(
    { email }: Partial<UserUpdateInput>,
    user: Partial<User>,
  ): Promise<Partial<UserOutputDto>> {
    const updated = await this.updateUserProfile({ email }, user);

    console.log('do reactivate email stuff');
    return updated;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }
}

// change profile data
// upload an avatar
// change email
// change password
