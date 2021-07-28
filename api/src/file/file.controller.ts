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
  Get,
  Param,
  Res,
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

export const MAX_FILES = 15;

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('/upload')
  @UseGuards(RestAuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', MAX_FILES, {
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

  @Get('/:file_path')
  @UseGuards(RestAuthGuard)
  async sendUploadedFile(@Param('file_path') filePath, @Res() res) {
    return res.sendFile(filePath, { root: join(__dirname, '../../uploads/') });
  }
}
