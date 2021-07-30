import { Module } from '@nestjs/common';
import { FileModule } from 'src/file/file.module';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule, FileModule],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
  controllers: [UserController],
})
export class UserModule {}
