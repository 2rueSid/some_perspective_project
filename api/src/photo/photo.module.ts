import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { PhotoResolver } from './photo.resolver';
import { PhotoService } from './photo.service';

@Module({
  imports: [PrismaModule],
  providers: [PhotoService, PhotoResolver],
  exports: [PhotoService, PhotoResolver],
})
export class PhotoModule {}
