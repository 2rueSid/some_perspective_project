import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PhotoCommentsGraphQL } from 'src/photo_comments/photo_comments.dto';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class CommentReactionGraphQL {
  @Field()
  id?: number;
  @Field()
  comment_id?: number;
  @Field()
  user_id?: number;
  @Field()
  is_liked?: boolean;
  @Field()
  is_disliked?: boolean;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
  @Field(() => PhotoCommentsGraphQL)
  Comment?: PhotoCommentsGraphQL;
  @Field(() => UserGraphQL)
  User?: UserGraphQL;
}

@InputType()
export class CommentReactionsCreateInput {
  @Field()
  comment_id: number;
  @Field({ nullable: true })
  user_id: number;
  @Field()
  is_liked: boolean;
  @Field()
  is_disliked: boolean;
}
