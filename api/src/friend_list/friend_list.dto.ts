import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class FriendListOutputDto {
  @Field()
  id?: number;
  @Field()
  user_id?: number;
  @Field()
  friend_id?: number;
  @Field()
  created_at?: Date;
  @Field({ nullable: true })
  is_requested?: boolean;
  @Field({ nullable: true })
  is_accepted?: boolean;
  @Field()
  updated_at?: Date;
  @Field(() => UserGraphQL)
  User?: UserGraphQL;
}

@InputType()
export class AddToFriendListInput {
  @Field()
  friend_id: number;
}

@InputType()
export class GetUserFriendsInput {
  @Field()
  user_slug: string;
}
