import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { FileController } from './file.controller';
import { FileResolver } from './file.resolver';
import { FileService } from './file.service';

@Module({
  imports: [PrismaModule],
  providers: [FileService, FileResolver, Logger],
  exports: [FileService, FileResolver],
  controllers: [FileController],
})
export class FileModule {}
