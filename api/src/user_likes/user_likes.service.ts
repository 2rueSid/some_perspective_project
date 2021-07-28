import { Injectable } from '@nestjs/common';
import { UserLikes } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserReactionInput } from './user_likes.dto';

@Injectable()
export class UserLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async setUserReaction({
    user_id,
    photo_id,
    is_disliked,
    is_liked,
  }: UserReactionInput): Promise<boolean> {
    let result: boolean;

    const userReaction = await this.prisma.userLikes.findUnique({
      where: {
        user_id_photo_id: {
          user_id,
          photo_id,
        },
      },
    });

    if (!!userReaction) {
      result = await this.updateUserLikes({
        id: userReaction.id,
        is_disliked,
        is_liked,
      });
    }

    if (!!!userReaction) {
      result = await this.createUserLike({
        user_id,
        photo_id,
        is_disliked,
        is_liked,
      });
    }

    return result;
  }

  private async updateUserLikes({
    id,
    is_disliked,
    is_liked,
  }: Partial<UserLikes>): Promise<boolean> {
    const res = await this.prisma.userLikes.update({
      where: {
        id,
      },
      data: {
        is_disliked,
        is_liked,
      },
    });

    return !!res;
  }

  private async createUserLike(data: UserReactionInput): Promise<boolean> {
    const res = await this.prisma.userLikes.create({ data });

    return !!res;
  }
}
