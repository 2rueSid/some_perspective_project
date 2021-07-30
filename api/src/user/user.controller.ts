import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { join } from 'path';
import { RestAuthGuard } from 'src/auth/auth.gaurd';
import { RestCurrentUser } from 'src/user/current_user.decorator';
import { updateFileName } from 'src/utils/upload_files';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/avatar')
  @UseGuards(RestAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '../../uploads'),
        filename: updateFileName,
      }),
    }),
  )
  async uploadFiles(
    @UploadedFile() uploadedFile: Express.Multer.File,
    @RestCurrentUser() currentUser: Partial<User>,
  ): Promise<Partial<User>> {
    return await this.userService.uploadAvatar(uploadedFile, currentUser);
  }
}
