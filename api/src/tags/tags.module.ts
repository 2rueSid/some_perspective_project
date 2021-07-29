import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [PrismaModule],
  providers: [TagsService, TagsResolver],
  exports: [TagsService, TagsResolver],
})
export class TagsModule {}
