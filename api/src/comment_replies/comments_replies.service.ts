import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { CreateReplyInput } from './comment_replies.dto';

@Injectable()
export class CommentRepliesService {
  constructor(private readonly prisma: PrismaService) {}

  async createReply({
    comment_id,
    reply_to,
  }: CreateReplyInput): Promise<boolean> {
    const res = await this.prisma.commentReplies.create({
      data: {
        comment_id,
        reply_to,
      },
    });

    return !!res;
  }
}
