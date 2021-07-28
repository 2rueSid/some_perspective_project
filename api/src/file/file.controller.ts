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
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { join } from 'path';
import { RestAuthGuard } from 'src/auth/auth.gaurd';
import { RestCurrentUser } from 'src/user/current_user.decorator';
import { updateFileName } from 'src/utils/upload_files';
import { FileOutput } from './file.dto';
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
  @UseInterceptors(
    FilesInterceptor('files', 16, {
      storage: diskStorage({
        destination: join(__dirname, '../../uploads'),
        filename: updateFileName,
      }),
    }),
  )
  async uploadFiles(
    @UploadedFiles() uploadedFiles,
    @RestCurrentUser() currentUser: Partial<User>,
    @Body() body: Partial<FileOutput>,
  ): Promise<FileOutput[]> {
    if (uploadedFiles?.length > MAX_FILES || !uploadedFiles?.length) {
      throw new NotAcceptableException();
    }

    return await this.fileService.uploadFiles(uploadedFiles, currentUser, body);
  }
}
