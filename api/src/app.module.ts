import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma_client/prisma.module';
import { configModule } from './config.module';
import { TokenModule } from './token/token.module';
import { FileModule } from './file/file.module';
import { UserLikesModule } from './user_likes/user_likes.module';
import { PhotoModule } from './photo/photo.module';
import { TagsModule } from './tags/tags.module';
import { PhotoComments } from './photo_comments/photo_comments.module';
import { CommentReplies } from './comment_replies/comment_replies.module';
import { CommentReactions } from './comment_reactions/comment_reaction.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      sortSchema: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    AuthModule,
    PrismaModule,
    configModule,
    TokenModule,
    FileModule,
    UserLikesModule,
    PhotoModule,
    TagsModule,
    PhotoComments,
    CommentReplies,
    CommentReactions,
  ],
})
export class AppModule {}
