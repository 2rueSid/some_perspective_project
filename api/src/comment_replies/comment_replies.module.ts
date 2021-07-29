import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { CommentRepliesResolver } from './comments_replies.resolver';
import { CommentRepliesService } from './comments_replies.service';

@Module({
  imports: [PrismaModule],
  providers: [CommentRepliesResolver, CommentRepliesService],
  exports: [CommentRepliesResolver, CommentRepliesService],
})
export class CommentReplies {}
