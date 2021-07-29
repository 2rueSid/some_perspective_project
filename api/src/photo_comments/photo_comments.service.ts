import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PaginationOptions } from 'src/photo/photo.dto';
import { PrismaService } from 'src/prisma_client/prisma.service';
import {
  CommentsWithPagination,
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
    const where = { photo_id: photoId };

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
}

/*
  create comment
  get comments by photo id
  update comment
  delete comment

*/
