import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma_client/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: true, sortSchema: true }),
    AuthModule,
    PrismaModule,
  ],
})
export class AppModule {}
