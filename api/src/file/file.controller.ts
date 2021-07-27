import {
  Controller,
  LoggerService,
  NotAcceptableException,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Inject,
  Logger,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RestAuthGuard } from 'src/auth/auth.gaurd';
import { FileService } from './file.service';

export const MAX_FILES = 5;

@Controller('upload')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('/files')
  @UseGuards(RestAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @UploadedFiles() uploadedFiles: Express.Multer.File[],
  ): Promise<boolean> {
    if (uploadedFiles.length > MAX_FILES || !uploadedFiles.length) {
      this.logger.error('Too many files');
      throw new NotAcceptableException();
    }

    return await this.fileService.uploadFiles(uploadedFiles);
  }
}
