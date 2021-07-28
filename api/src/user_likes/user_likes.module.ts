import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { UserLikesResolver } from './user_likes.resolver';
import { UserLikesService } from './user_likes.service';

@Module({
  imports: [PrismaModule],
  providers: [UserLikesResolver, UserLikesService],
  exports: [UserLikesResolver, UserLikesService],
})
export class UserLikesModule {}
