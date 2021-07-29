import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { CommentReactionsResolver } from './comment_reaction.resolver';
import { CommentReactionsService } from './comment_reactions.service';

@Module({
  imports: [PrismaModule],
  providers: [CommentReactionsResolver, CommentReactionsService],
  exports: [CommentReactionsResolver, CommentReactionsService],
})
export class CommentReactions {}
