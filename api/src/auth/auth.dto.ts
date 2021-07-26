import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@InputType()
export class UserSignUpInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  first_name: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field()
  send_emails: boolean;
}

@ObjectType()
export class UserOutputDto {
  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  role?: Role;

  @Field({ nullable: true })
  is_active?: boolean;

  @Field({ nullable: true })
  is_disabled?: boolean;

  @Field({ nullable: true })
  is_deleted?: boolean;
}
