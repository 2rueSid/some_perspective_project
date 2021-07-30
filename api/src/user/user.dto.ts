import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class UserGraphQL {
  @Field()
  id?: number;
  @Field()
  email?: string;
  @Field()
  slug?: string;
  @Field()
  password?: string;
  @Field()
  first_name?: string;
  @Field()
  last_name?: string | null;
  @Field()
  avatar_id?: number | null;
  @Field()
  role?: Role;
  @Field()
  is_active?: boolean;
  @Field()
  is_disabled?: boolean;
  @Field()
  send_emails?: boolean;
  @Field()
  deleted_at?: Date | null;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  first_name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  is_active?: boolean;

  @Field({ nullable: true })
  is_disabled?: boolean;

  @Field({ nullable: true })
  send_emails?: boolean;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  avatar_id?: number | null;
}
