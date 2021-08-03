import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import {
  UserPublicProfileInput,
  UserPublicProfileOutput,
} from './public_profile.dto';
import { PublicProfileModel } from './public_profile.model';

@Injectable()
export class PublicProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async createPublicProfile(
    data: UserPublicProfileInput,
    { slug }: Partial<User>,
  ): Promise<Partial<UserPublicProfileOutput>> {
    const user = await UserModel({ slug });

    if (!user.exists || user.isDeleted) {
      throw new HttpException('Not Found', 404);
    }

    if (user.has_public_profile) {
      throw new HttpException('Already exists', 204);
    }

    const publicProfile = await this.prisma.userPublicProfile.create({
      data: {
        ...data,
        user_id: user.id,
      },
    });

    return publicProfile;
  }

  async updatePublicProfile(
    data: UserPublicProfileInput,
    { slug }: Partial<User>,
  ): Promise<Partial<UserPublicProfileOutput>> {
    const user = await UserModel({ slug });
    const profile = await PublicProfileModel({ user_id: user.id });

    if (!profile?.exists || profile?.deleted_at) {
      throw new HttpException('Not Exists', 404);
    }

    return await profile.update(data);
  }

  async deletePublicProfile({ slug }: Partial<User>): Promise<boolean> {
    const user = await UserModel({ slug });
    const profile = await PublicProfileModel({ user_id: user.id });

    if (!profile?.exists || profile?.deleted_at) {
      throw new HttpException('Not Exists', 404);
    }

    return await profile.delete();
  }

  async getPublicProfile({
    slug,
  }: Partial<User>): Promise<Partial<UserPublicProfileOutput>> {
    const user = await UserModel({ slug });

    if (!user.exists || user.isDeleted) {
      throw new HttpException('Not Found', 404);
    }

    if (user.has_public_profile) {
      throw new HttpException('Already exists', 204);
    }

    return await PublicProfileModel({ user_id: user.id });
  }
}
