import { Field, ObjectType } from '@nestjs/graphql';
import { FileTypes } from '@prisma/client';
import { PhotoGraphQL } from 'src/photo/photo.dto';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class FileOutput {
  @Field()
  id: number;

  @Field()
  originalname: string;

  @Field()
  size: number;

  @Field()
  extension: string;

  @Field()
  type: FileTypes;

  @Field()
  download: string;

  @Field(() => UserGraphQL)
  user?: UserGraphQL;

  @Field(() => PhotoGraphQL, { nullable: true })
  photo?: PhotoGraphQL;
}

@ObjectType()
export class FileGraphQL {
  @Field()
  id?: number;
  @Field()
  name?: string;
  @Field()
  originalname?: string;
  @Field()
  size?: number;
  @Field()
  extension?: string;
  @Field()
  type?: FileTypes;
  @Field()
  download?: string | null;
  @Field()
  user_id?: number;
  @Field()
  photo_id?: number | null;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
}
