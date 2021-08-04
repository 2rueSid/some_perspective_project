import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { MESSAGES_SERVICE } from './message.module';

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(MESSAGES_SERVICE) private subscribersService: ClientProxy,
  ) {}
}
