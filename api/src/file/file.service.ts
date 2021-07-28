import { extname } from 'path';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { File, Prisma, User } from '@prisma/client';

import { PrismaService } from 'src/prisma_client/prisma.service';
import { FileOutput } from './file.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async uploadFiles(
    files: Express.Multer.File[],
    user: Partial<User>,
    { type }: Partial<FileOutput>,
  ): Promise<FileOutput[]> {
    const uploadedFiles: FileOutput[] = [];
    await Promise.all(
      files.map(async (value) => {
        const file = await this.saveFileLocal(value, user, { type });
        uploadedFiles.push(file);
      }),
    );

    return uploadedFiles;
  }

  private async saveFileLocal(
    file: Express.Multer.File,
    { email, slug }: Partial<User>,
    { type }: Partial<FileOutput>,
  ): Promise<File> {
    const fileToSafe: Prisma.FileCreateInput = {
      originalname: file.originalname,
      size: file.size,
      User: {
        connect: {
          email_slug: {
            email,
            slug,
          },
        },
      },
      type,
      download: file.path,
      name: file.filename,
      extension: extname(file.originalname),
    };

    const savedFile = await this.prisma.file.create({ data: fileToSafe });

    return savedFile;
  }
}
