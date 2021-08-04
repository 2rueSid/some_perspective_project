import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import { CreateMessageInput, MessageOutputDto } from './message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    { receiver_id, message }: CreateMessageInput,
    user: Partial<User>,
  ): Promise<Partial<MessageOutputDto>> {
    const receiver = await UserModel({ id: receiver_id });

    if (!receiver.exists || receiver.isDeleted()) {
      throw new HttpException('Not Exists', 404);
    }

    return await this.prisma.message.create({
      data: {
        message,
        receiver_id,
        user_id: user.id,
      },
      include: {
        User: true,
      },
    });
  }
}

/*
 *  send message
 *  delete message
 *  update message
 *  get all messages
 *  get unreaded messages
 *  send photo as message
 *
 */
