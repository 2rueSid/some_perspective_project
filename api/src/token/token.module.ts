import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';

import { TokenService } from './token.service';

@Module({
  imports: [PrismaModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
