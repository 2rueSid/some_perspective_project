import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserOutputDto } from 'src/auth/auth.dto';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from './current_user.decorator';
import { UserUpdateInput } from './user.dto';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutputDto)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args({ name: 'updateUserArgs', type: () => UserUpdateInput })
    updateUserArgs,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<UserOutputDto>> {
    return await this.userService.updateUserProfile(updateUserArgs, user);
  }

  @Mutation(() => UserOutputDto)
  @UseGuards(GqlAuthGuard)
  async changeUserPassword(
    @Args({ name: 'changePasswordArgs', type: () => UserUpdateInput })
    changePasswordArgs: UserUpdateInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<UserOutputDto>> {
    return await this.userService.changePassword(changePasswordArgs, user);
  }

  @Mutation(() => UserOutputDto)
  @UseGuards(GqlAuthGuard)
  async changeEmail(
    @Args({ name: 'changeEmailArgs', type: () => UserUpdateInput })
    changeEmailArgs: UserUpdateInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<UserOutputDto>> {
    return await this.userService.changeEmail(changeEmailArgs, user);
  }
}
