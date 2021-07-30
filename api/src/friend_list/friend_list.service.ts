import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class FriendListService {
  constructor(private readonly prismaService: PrismaService) {}

  async sayHi(): Promise<void> {
    console.log('hi');
  }
}
