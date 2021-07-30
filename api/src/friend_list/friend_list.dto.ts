import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field()
  updated_at?: Date;
  @Field(() => UserGraphQL)
  User?: UserGraphQL;
}
