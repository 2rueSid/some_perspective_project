import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PaginationOptions } from 'src/photo/photo.dto';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { PhotoCommentsModel } from './photo.comments.model';
import {
  CommentsWithPagination,
  CommentUpdateInput,
  CreatePhotoComment,
  PhotoCommentsGraphQL,
} from './photo_comments.dto';

@Injectable()
export class PhotoCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createComment(
    { id }: Partial<User>,
    data: CreatePhotoComment,
  ): Promise<Partial<PhotoCommentsGraphQL>> {
    const newComment = await this.prisma.photoComments.create({
      data: { user_id: id, ...data },
    });

    return await newComment;
  }

  async getCommentsByPhotoId(
    photoId: number,
    { skip, take, page }: PaginationOptions,
  ): Promise<CommentsWithPagination> {
    const where: Prisma.PhotoCommentsWhereInput = {
      photo_id: photoId,
      deleted_at: null,
    };

    const comments = await this.prisma.photoComments.findMany({
      skip,
      take,
      where,
    });

    const totalItems = await this.prisma.photoComments.count({ where });
    const itemCount = comments?.length;
    const totalPages = Math.round(totalItems / take);
    const currentPage = page;

    const meta = {
      totalItems,
      itemCount,
      totalPages,
      currentPage,
    };

    return { meta, items: comments };
  }

  async deleteComment(
    { id }: Partial<User>,
    commentId: number,
  ): Promise<boolean> {
    const comment = await PhotoCommentsModel({ id: commentId });

    if (!comment.isOwner(id)) {
      throw new HttpException('Not permitted', 405);
    }

    return comment.delete();
  }

  async updateComment(
    { id: userId }: Partial<User>,
    { comment, id }: CommentUpdateInput,
  ): Promise<Partial<PhotoCommentsGraphQL>> {
    const commentToUpdate = await PhotoCommentsModel({ id });

    if (!commentToUpdate.isOwner(userId)) {
      throw new HttpException('Not permitted', 405);
    }

    return await commentToUpdate.update({ comment });
  }
}
