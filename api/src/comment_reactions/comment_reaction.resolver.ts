import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { CommentReactionsService } from './comment_reactions.service';

@Resolver()
export class CommentReactionsResolver {
  constructor(private readonly reactionsService: CommentReactionsService) {}
}
