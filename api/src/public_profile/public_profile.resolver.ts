import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import {
  UserPublicProfileInput,
  UserPublicProfileOutput,
} from './public_profile.dto';
import { PublicProfileService } from './public_profile.service';

@Resolver()
export class PublicProfileResolver {
  constructor(private readonly publicProfileService: PublicProfileService) {}

  @Mutation(() => UserPublicProfileOutput)
  @UseGuards(GqlAuthGuard)
  async createPublicProfile(
    @Args({ name: 'createProfileArgs', type: () => UserPublicProfileInput })
    createProfileArgs: UserPublicProfileInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<UserPublicProfileOutput>> {
    return await this.publicProfileService.createPublicProfile(
      createProfileArgs,
      user,
    );
  }

  @Mutation(() => UserPublicProfileOutput)
  @UseGuards(GqlAuthGuard)
  async updatePublicProfile(
    @Args({ name: 'profileUpdateArgs', type: () => UserPublicProfileInput })
    profileUpdateArgs: UserPublicProfileInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<UserPublicProfileOutput>> {
    return await this.publicProfileService.updatePublicProfile(
      profileUpdateArgs,
      user,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePublicProfile(
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.publicProfileService.deletePublicProfile(user);
  }

  @Query(() => UserPublicProfileOutput)
  async getPublicProfile(
    @Args('slug') slug: string,
  ): Promise<Partial<UserPublicProfileOutput>> {
    return await this.publicProfileService.getPublicProfile(slug);
  }
}
