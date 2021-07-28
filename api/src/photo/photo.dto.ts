import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { FileGraphQL } from 'src/file/file.dto';
import { TagsGraphQL } from 'src/tags/tags.dto';
import { UserGraphQL } from 'src/user/user.dto';
import { UserLikesGraphQL } from 'src/user_likes/user_likes.dto';

@InputType()
export class CreatePhotoInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  user_id?: number;
}

@ObjectType()
export class PhotoOutputDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  user_id?: number;

  @Field({ nullable: true })
  deleted_at?: Date;

  @Field(() => UserGraphQL)
  User?: UserGraphQL;

  @Field(() => [FileGraphQL], { nullable: true })
  Files?: FileGraphQL[];

  @Field(() => [UserLikesGraphQL], { nullable: true })
  UserLikes?: UserLikesGraphQL[];

  @Field(() => [TagsGraphQL], { nullable: true })
  Tags?: TagsGraphQL[];
}

@InputType()
export class UpdatePhotoInput {
  @Field()
  slug: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class PaginationOptions {
  @Field()
  cursor: number;
}

@InputType()
export class DeletePhotoInput {
  @Field()
  slug: string;
}

@ObjectType()
export class PhotoGraphQL {
  @Field()
  id?: number;
  @Field()
  title?: string;
  @Field()
  slug?: string;
  @Field()
  description?: string | null;
  @Field()
  user_id?: number;
  @Field()
  deleted_at?: Date | null;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
}
