import { Field, ObjectType } from '@nestjs/graphql';
import { FileTypes, Photo, User } from '@prisma/client';

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

  @Field()
  user?: User;

  @Field()
  photo?: Photo;
}
