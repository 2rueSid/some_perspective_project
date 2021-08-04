import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { MessagesResolver } from './message.resolver';
import { MessagesService } from './messages.service';

export const MESSAGES_SERVICE = 'MESSAGES_SERVICE';
@Module({
  imports: [PrismaModule],
  providers: [MessagesService, MessagesResolver],
  exports: [MessagesService, MessagesResolver],
})
export class Messages {}
