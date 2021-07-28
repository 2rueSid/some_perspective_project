import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { PhotoService } from './photo.service';

@Module({
  imports: [PrismaModule],
  providers: [PhotoService],
  exports: [PhotoService],
})
export class PhotoModule {}
