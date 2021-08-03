import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import { AddToFriendListInput, FriendListOutputDto } from './friend_list.dto';

@Injectable()
export class FriendListService {
  constructor(private readonly prismaService: PrismaService) {}

  async addToFriendList(
    { friend_id }: AddToFriendListInput,
    user: Partial<User>,
  ): Promise<boolean> {
    const friendToAdd = await UserModel({ id: friend_id });

    if (friendToAdd.isDeleted()) {
      throw new HttpException('User not exists', 404);
    }

    return !!(await this.prismaService.friendList.create({
      data: {
        user_id: user.id,
        friend_id,
        is_accepted: false,
        is_requested: true,
      },
    }));
  }

  async acceptInvitation(
    { friend_id }: Partial<AddToFriendListInput>,
    user: Partial<User>,
  ): Promise<boolean> {
    await this.prismaService.friendList.create({
      data: {
        user_id: friend_id,
        friend_id: user.id,
        is_accepted: true,
        is_requested: false,
      },
    });

    const res = await this.prismaService.friendList.update({
      where: {
        user_id_friend_id: {
          user_id: user.id,
          friend_id: friend_id,
        },
      },
      data: {
        is_accepted: true,
        is_requested: false,
      },
    });

    return !!res;
  }

  async removeFromList(
    { friend_id }: AddToFriendListInput,
    user: Partial<User>,
  ): Promise<boolean> {
    return !!(await this.prismaService.friendList.deleteMany({
      where: {
        friend_id: {
          in: [user.id, friend_id],
        },
        user_id: {
          in: [friend_id, user.id],
        },
      },
    }));
  }

  async getUserFriends(userSlug: string): Promise<FriendListOutputDto[]> {
    const friends = await this.prismaService.friendList.findMany({
      where: {
        User: {
          slug: userSlug,
        },
        is_accepted: true,
      },
      include: {
        User: true,
      },
    });

    return friends;
  }
}
