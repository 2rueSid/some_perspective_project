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

@InputType()
export class UserSignInInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: false })
  remember_me?: boolean;
}

@InputType()
export class CreateResetToken {
  @Field()
  email: string;
}

@InputType()
export class ResetUserPassword {
  @Field()
  reset_token: string;

  @Field()
  password: string;
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

  @Field({ nullable: true })
  authorization_token: string;
}
