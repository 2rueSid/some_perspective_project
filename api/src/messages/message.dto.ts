import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class MessageOutputDto {
  @Field()
  id?: number;
  @Field()
  message?: string;
  @Field()
  is_edited?: boolean;
  @Field()
  is_seen?: boolean;
  @Field({ nullable: true })
  deleted_at?: Date;
  @Field()
  receiver_id?: number;
  @Field()
  user_id?: number;
  @Field({ nullable: true })
  created_at?: Date;
  @Field()
  conversation_id?: number;
  @Field({ nullable: true })
  updated_at?: Date;
  @Field(() => UserGraphQL, { nullable: true })
  User?: UserGraphQL;
}

@InputType()
export class CreateMessageInput {
  @Field()
  message?: string;
  @Field()
  receiver_id?: number;
}

@InputType()
export class UpdateMessageInput {
  @Field()
  id?: number;
  @Field()
  is_edited?: boolean;
  @Field()
  is_seen?: boolean;
  @Field()
  message?: string;
}

@InputType()
export class GetMessagesInput {
  @Field()
  receiver_id?: number;
  @Field()
  conversation_id?: number;
}
