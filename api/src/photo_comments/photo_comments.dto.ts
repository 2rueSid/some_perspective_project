import { Field, ObjectType } from '@nestjs/graphql';
import { PhotoGraphQL } from 'src/photo/photo.dto';
import { UserGraphQL } from 'src/user/user.dto';

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
