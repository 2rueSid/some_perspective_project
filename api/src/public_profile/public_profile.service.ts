import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class PublicProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async sayHi(): Promise<void> {
    console.log('hi');
  }
}
