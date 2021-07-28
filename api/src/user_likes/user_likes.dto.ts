import { Field, InputType } from '@nestjs/graphql';

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
