import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma_client/prisma.module';
import { configModule } from './config.module';
import { TokenModule } from './token/token.module';
import { FileModule } from './file/file.module';

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
  ],
})
export class AppModule {}
