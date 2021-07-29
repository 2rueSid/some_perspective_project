import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import {
  MetaPagination,
  PaginationOptions,
  PhotoGraphQL,
} from 'src/photo/photo.dto';
import { UserGraphQL } from 'src/user/user.dto';

@InputType()
export class CommentUpdateInput {
  @Field()
  comment: string;

  @Field()
  id: number;
}

@ObjectType()
export class PhotoCommentsGraphQL {
  @Field()
  id?: number;
  @Field()
  comment?: string;
  @Field()
  photo_id?: number;
  @Field()
  user_id?: number;
  @Field()
  is_edited?: boolean;
  @Field()
  is_seen?: boolean;
  @Field()
  deleted_at?: Date;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
  @Field(() => UserGraphQL)
  User?: UserGraphQL;
  @Field(() => PhotoGraphQL)
  Photo?: PhotoGraphQL;
  @Field()
  CommentReplies?: boolean;
  @Field()
  CommentReactions?: boolean;
}

@InputType()
export class CreatePhotoComment {
  @Field()
  comment: string;
  @Field()
  photo_id: number;
}

@ObjectType()
export class CommentsWithPagination {
  @Field(() => [PhotoCommentsGraphQL])
  items: PhotoCommentsGraphQL[];

  @Field(() => MetaPagination)
  meta: MetaPagination;
}

@InputType()
export class PhotoCommentsInput extends PickType(PaginationOptions, [
  'page',
  'take',
  'skip',
] as const) {
  photoId: number;
}
