import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PhotoCommentsGraphQL } from 'src/photo_comments/photo_comments.dto';

@InputType()
export class CreateReplyInput {
  @Field()
  comment_id: number;

  @Field()
  reply_to: number;
}

@ObjectType()
export class CommentRepliesGraphQL {
  @Field()
  id?: number;
  @Field()
  comment_id?: number;
  @Field()
  reply_to?: number;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
  @Field(() => PhotoCommentsGraphQL)
  Comment?: PhotoCommentsGraphQL;
}
