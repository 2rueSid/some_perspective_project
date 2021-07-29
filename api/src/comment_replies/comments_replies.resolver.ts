import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CommentRepliesService } from './comments_replies.service';
import { CreateReplyInput } from './comment_replies.dto';

@Resolver()
export class CommentRepliesResolver {
  constructor(private readonly commentReplies: CommentRepliesService) {}

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async createReply(
    @Args({ name: 'replyToArgs', type: () => CreateReplyInput })
    replyTo: CreateReplyInput,
  ): Promise<boolean> {
    return await this.commentReplies.createReply(replyTo);
  }
}
