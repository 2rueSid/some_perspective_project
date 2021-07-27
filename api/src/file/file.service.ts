import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

import { PrismaService } from 'src/prisma_client/prisma.service';
import { FileOutput } from './file.dto';

@Injectable()
export class FileService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<boolean> {
    this.logger.debug(files);

    return true;
  }
}
// {
//   "filename": "Screenshot from 2021-06-18 11-43-40.png",
//   "mimetype": "image/png",
//   "encoding": "7bit"
// }

//  id           Int       @id @default(autoincrement())
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
