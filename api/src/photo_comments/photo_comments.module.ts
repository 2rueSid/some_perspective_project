import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { PhotoCommentsResolver } from './photo_comments.resolver';
import { PhotoCommentsService } from './photo_comments.service';

@Module({
  imports: [PrismaModule],
  providers: [PhotoCommentsService, PhotoCommentsResolver],
  exports: [PhotoCommentsService, PhotoCommentsResolver],
})
export class PhotoComments {}
