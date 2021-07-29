import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import { CommentReactionsCreateInput } from './comment_reaction.dto';
import { CommentReactionsService } from './comment_reactions.service';

@Resolver()
export class CommentReactionsResolver {
  constructor(private readonly reactionsService: CommentReactionsService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async createReaction(
    @Args({ name: 'commentReaction', type: () => CommentReactionsCreateInput })
    commentReaction: CommentReactionsCreateInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.reactionsService.crateReaction({
      user_id: user.id,
      ...commentReaction,
    });
  }
}
