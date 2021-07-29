import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { CommentReactionsCreateInput } from './comment_reaction.dto';

@Injectable()
export class CommentReactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async crateReaction({
    user_id,
    comment_id,
    ...data
  }: CommentReactionsCreateInput): Promise<boolean> {
    const reaction = await this.prisma.commentReactions.findUnique({
      where: {
        user_id_comment_id: {
          user_id,
          comment_id,
        },
      },
    });

    if (!reaction) {
      return this.createReaction({ ...data, user_id, comment_id });
    }

    if (reaction) {
      return this.updateReaction({ ...data, user_id, comment_id }, reaction.id);
    }
  }

  private async createReaction(
    data: CommentReactionsCreateInput,
  ): Promise<boolean> {
    return !!(await this.prisma.commentReactions.create({ data }));
  }

  private async updateReaction(
    data: CommentReactionsCreateInput,
    id: number,
  ): Promise<boolean> {
    return !!(await this.prisma.commentReactions.update({
      where: {
        id,
      },
      data,
    }));
  }
}
