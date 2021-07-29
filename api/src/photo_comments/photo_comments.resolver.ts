import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import {
  CommentsWithPagination,
  CommentUpdateInput,
  CreatePhotoComment,
  PhotoCommentsGraphQL,
  PhotoCommentsInput,
} from './photo_comments.dto';
import { PhotoCommentsService } from './photo_comments.service';

@Resolver()
export class PhotoCommentsResolver {
  constructor(private readonly photoCommentsService: PhotoCommentsService) {}

  @Mutation(() => PhotoCommentsGraphQL)
  @UseGuards(GqlAuthGuard)
  async createComment(
    @Args({ name: 'commentCreate', type: () => CreatePhotoComment })
    commentCreate: CreatePhotoComment,
    @CurrentUser() user: Partial<User>,
  ): Promise<PhotoCommentsGraphQL> {
    return await this.photoCommentsService.createComment(user, commentCreate);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteComment(
    @Args('comment_id') commentId: number,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.photoCommentsService.deleteComment(user, commentId);
  }

  @Mutation(() => PhotoCommentsGraphQL)
  @UseGuards(GqlAuthGuard)
  async updateComment(
    @Args({ name: 'updateCommentArgs', type: () => CommentUpdateInput })
    updateCommentArgs: CommentUpdateInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<PhotoCommentsGraphQL>> {
    return await this.photoCommentsService.updateComment(
      user,
      updateCommentArgs,
    );
  }

  @Query(() => CommentsWithPagination)
  async getCommentsByPhotoId(
    @Args({ name: 'pagination', type: () => PhotoCommentsInput })
    pagination: PhotoCommentsInput,
  ): Promise<CommentsWithPagination> {
    return await this.photoCommentsService.getCommentsByPhotoId(pagination);
  }
}
