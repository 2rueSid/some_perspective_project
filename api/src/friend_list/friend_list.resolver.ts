import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import {
  AddToFriendListInput,
  FriendListOutputDto,
  GetUserFriendsInput,
} from './friend_list.dto';
import { FriendListService } from './friend_list.service';

@Resolver()
export class FriendListResolver {
  constructor(private readonly friendListService: FriendListService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async addFriend(
    @Args({ name: 'addFriend', type: () => AddToFriendListInput })
    addFriendArgs: AddToFriendListInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.friendListService.addToFriendList(addFriendArgs, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async acceptInvitation(
    @Args({ name: 'acceptInvitationArgs', type: () => AddToFriendListInput })
    acceptInvitationArgs: AddToFriendListInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.friendListService.acceptInvitation(
      acceptInvitationArgs,
      user,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async removeFriend(
    @Args({ name: 'removeFriendArgs', type: () => AddToFriendListInput })
    removeFriendArgs: AddToFriendListInput,
    @CurrentUser()
    user: Partial<User>,
  ): Promise<boolean> {
    return await this.friendListService.removeFromList(removeFriendArgs, user);
  }

  @Query(() => [FriendListOutputDto])
  async getUserFriends(
    @Args({ name: 'getUserFriendsArgs', type: () => GetUserFriendsInput })
    { user_slug: userSlug }: GetUserFriendsInput,
  ): Promise<FriendListOutputDto[]> {
    return await this.friendListService.getUserFriends(userSlug);
  }
}
