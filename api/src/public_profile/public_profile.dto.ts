import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { UserGraphQL } from 'src/user/user.dto';

@ObjectType()
export class UserPublicProfileOutput {
  @Field()
  id?: number;
  @Field()
  about_me: string;
  @Field()
  user_id: number;
  @Field()
  facebook_link?: string;
  @Field()
  instagram_lik?: string;
  @Field()
  twitter_link?: string;
  @Field()
  youtube_link?: string;
  @Field()
  video_link?: string;
  @Field()
  public_email?: string;
  @Field()
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
