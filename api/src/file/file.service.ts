import { extname } from 'path';
import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { File, FileTypes, User } from '@prisma/client';

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
  ): Promise<boolean> {
    await Promise.all(
      files.map(async (value) => {
        await this.saveFileLocal(value, user, { type });
      }),
    );

    return true;
  }

  private async saveFileLocal(
    file: Express.Multer.File,
    user: Partial<User>,
    { type }: Partial<FileOutput>,
  ): Promise<File> {
    const fileToSafe: Partial<File> = {
      originalname: file.originalname,
      size: file.size,
      user_id: user.id,
      type,
      download: file.path,
      name: file.filename,
      extension: extname(file.originalname),
    };

    console.log(fileToSafe);
    return await this.prisma.file.findFirst();
  }
}

// };

//   id           Int       @id @default(autoincrement())
//   name         String
//   originalname String
//   size         Int
//   extension    String
//   type         FileTypes
//   download     String?
//   user_id      Int
//   photo_id     Int?
//   created_at   DateTime  @default(now())
//   updated_at   DateTime  @default(now())

//   User  User   @relation(fields: [user_id], references: [id])
//   Photo Photo? @relation(fields: [photo_id], references: [id])
//   @@map("uploaded_files")

// fieldname: 'files',
//     originalname: 'Screenshot from 2021-06-18 11-42-42.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//
