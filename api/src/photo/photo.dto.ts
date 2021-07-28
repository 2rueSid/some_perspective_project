import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { File, Tags, User, UserLikes } from '@prisma/client';

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
export class PhotoOutputDto extends PickType(CreatePhotoInput, [
  'description',
  'title',
  'user_id',
] as const) {
  @Field({ nullable: true })
  deleted_at?: string;

  @Field()
  User: User;

  @Field({ nullable: true })
  Files?: File[];

  @Field({ nullable: true })
  UserLikes?: UserLikes[];

  @Field({ nullable: true })
  Tags?: Tags[];
}
