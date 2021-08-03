import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { PublicProfileResolver } from './public_profile.resolver';
import { PublicProfileService } from './public_profile.service';

@Module({
  imports: [PrismaModule],
  providers: [PublicProfileResolver, PublicProfileService],
  exports: [PublicProfileResolver, PublicProfileService],
})
export class PublicProfile {}
