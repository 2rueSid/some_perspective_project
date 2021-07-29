import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { CommentRepliesService } from './comments_replies.service';

@Resolver()
export class CommentRepliesResolver {
  constructor(private readonly commentReplies: CommentRepliesService) {}
}
