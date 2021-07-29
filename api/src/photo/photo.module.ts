import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { Search } from 'src/search/search.module';
import { PhotoResolver } from './photo.resolver';
import { PhotoService } from './photo.service';

@Module({
  imports: [PrismaModule, Search],
  providers: [PhotoService, PhotoResolver],
  exports: [PhotoService, PhotoResolver],
})
export class PhotoModule {}
