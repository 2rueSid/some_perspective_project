import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class CommentRepliesService {
  constructor(private readonly prisma: PrismaService) {}

  async createReply(commentId: number, replyTo: number): Promise<boolean> {
    const res = await this.prisma.commentReplies.create({
      data: {
        comment_id: commentId,
        reply_to: replyTo,
      },
    });

    return !!res;
  }
}
