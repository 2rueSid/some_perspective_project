import { Field, ObjectType } from '@nestjs/graphql';

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
