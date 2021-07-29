import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  imports: [PrismaModule],
  providers: [SearchService, SearchResolver],
  exports: [SearchService, SearchResolver],
})
export class Search {}
