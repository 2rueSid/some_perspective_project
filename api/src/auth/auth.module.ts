import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma_client/prisma.module';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, PrismaService, AuthResolver],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
