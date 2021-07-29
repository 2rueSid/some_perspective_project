import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PhotoGraphQL } from 'src/photo/photo.dto';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class TagsGraphQL {
  @Field()
  id?: number;
  @Field()
  name?: string;
  @Field()
  description?: string | null;
  @Field()
  photo_id?: number | null;
  @Field()
  user_id?: number | null;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
}

@ObjectType()
export class TagsOutputDto {
  @Field()
  id?: number;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  photo_id?: number;
  @Field()
  user_id: number;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
  @Field(() => UserGraphQL)
  User?: UserGraphQL;
  @Field(() => [PhotoGraphQL])
  Photo?: PhotoGraphQL;
}

@InputType()
export class CreateTagsInput {
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  photo_id?: number;
}
