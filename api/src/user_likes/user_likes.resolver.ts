import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { UserReactionInput } from './user_likes.dto';
import { UserLikesService } from './user_likes.service';

@Resolver()
export class UserLikesResolver {
  constructor(private readonly userLikes: UserLikesService) {}

  @Mutation(() => Boolean)
  async setUserReaction(
    @Args({ name: 'userReaction', type: () => UserReactionInput })
    userReaction: UserReactionInput,
  ): Promise<boolean> {
    return await this.userLikes.setUserReaction(userReaction);
  }
}
