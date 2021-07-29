import { Field, ObjectType } from '@nestjs/graphql';
import { SearchType } from '@prisma/client';

@ObjectType()
export class SearchGraphQL {
  @Field()
  id?: number;
  @Field()
  type?: SearchType;
  @Field()
  searchable?: string;
  @Field()
  searchable_id?: number;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
}
