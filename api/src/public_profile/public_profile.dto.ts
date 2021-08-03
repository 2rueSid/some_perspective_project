import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class UserPublicProfileOutput {
  @Field()
  id?: number;
  @Field({ nullable: true })
  about_me: string;
  @Field()
  user_id: number;
  @Field({ nullable: true })
  facebook_link?: string;
  @Field({ nullable: true })
  instagram_lik?: string;
  @Field({ nullable: true })
  twitter_link?: string;
  @Field({ nullable: true })
  youtube_link?: string;
  @Field({ nullable: true })
  video_link?: string;
  @Field({ nullable: true })
  public_email?: string;
  @Field({ nullable: true })
  years?: string;
  @Field()
  deleted_at?: Date;
  @Field()
  created_at?: Date;
  @Field()
  updated_at?: Date;
  @Field(() => UserGraphQL)
  User?: UserGraphQL;
}

@InputType()
export class UserPublicProfileInput extends PickType(UserPublicProfileOutput, [
  'about_me',
  'facebook_link',
  'instagram_lik',
  'public_email',
  'twitter_link',
  'years',
  'video_link',
  'youtube_link',
] as const) {}
