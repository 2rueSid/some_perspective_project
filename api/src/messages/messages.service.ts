import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { UserModel } from 'src/user/user.model';
import {
  CreateMessageInput,
  MessageOutputDto,
  UpdateMessageInput,
} from './message.dto';
import { MessageModel } from './message.model';

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

  async deleteMessage(
    id: number,
    { id: userId }: Partial<User>,
  ): Promise<boolean> {
    const message = await MessageModel({ id });

    if (!message.exists || message.isDeleted) {
      throw new HttpException('Not Found', 404);
    }

    if (!message.isOwner(userId)) {
      throw new HttpException('Forbidden', 403);
    }

    return !!(await message.delete());
  }

  async updateMessage(
    { id, ...data }: UpdateMessageInput,
    { id: userId }: Partial<User>,
  ): Promise<Partial<MessageOutputDto>> {
    const message = await MessageModel({ id });

    if (!message.exists || message.isDeleted) {
      throw new HttpException('Not Found', 404);
    }

    if (!message.isOwner(userId)) {
      throw new HttpException('Forbidden', 403);
    }

    return await message.update(data);
  }

  async getMessages(
    receiverId: number,
    { id }: Partial<User>,
  ): Promise<MessageOutputDto[]> {
    await this.prisma.message.updateMany({
      where: {
        receiver_id: receiverId,
        user_id: id,
        is_seen: false,
      },
      data: {
        is_seen: true,
      },
    });

    return await this.prisma.message.findMany({
      where: {
        receiver_id: receiverId,
        user_id: id,
      },
    });
  }

  async getUnreadedMessages({
    id,
  }: Partial<User>): Promise<MessageOutputDto[]> {
    return await this.prisma.message.findMany({
      where: {
        receiver_id: id,
        is_seen: false,
      },
    });
  }
}
