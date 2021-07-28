import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UserReactionInput {
  @Field()
  is_liked: boolean;

  @Field()
  is_disliked: boolean;

  @Field()
  user_id: number;

  @Field()
  photo_id: number;
}

@ObjectType()
export class UserLikesGraphQL {
  @Field()
  id?: number;
  @Field()
  user_id?: number;
  @Field()
  photo_id?: number;
  @Field()
  is_liked?: boolean;
  @Field()
  is_disliked?: boolean;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
}
