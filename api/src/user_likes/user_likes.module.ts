import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class UserLikesModule {}
