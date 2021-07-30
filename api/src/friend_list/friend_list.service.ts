import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import { AddToFriendListInput } from './friend_list.dto';

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
      data: { user_id: user.id, friend_id },
    }));
  }

  async removeFromList(
    { friend_id }: AddToFriendListInput,
    user: Partial<User>,
  ): Promise<boolean> {
    return !!(await this.prismaService.friendList.delete({
      where: {
        user_id_friend_id: {
          user_id: user.id,
          friend_id,
        },
      },
    }));
  }
}
