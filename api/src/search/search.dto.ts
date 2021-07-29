import { Field, InputType, ObjectType } from '@nestjs/graphql';
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

@InputType()
export class AddUSerToSearchableInput {
  @Field({ defaultValue: SearchType.USER })
  type?: SearchType;
  @Field()
  searchable: string;
  @Field()
  searchable_id: number;
}

@InputType()
export class AddPhotoToSearchableInput {
  @Field({ defaultValue: SearchType.PHOTO })
  type?: SearchType;
  @Field()
  searchable: string;
  @Field()
  searchable_id: number;
}
