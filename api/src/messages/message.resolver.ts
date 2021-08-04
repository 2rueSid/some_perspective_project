import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import {
  CreateMessageInput,
  GetMessagesInput,
  MessageOutputDto,
  UpdateMessageInput,
} from './message.dto';
import { MessagesService } from './messages.service';

@Resolver()
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  @Mutation(() => MessageOutputDto)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @Args({ name: 'createMessageArgs', type: () => CreateMessageInput })
    createMessageInput: CreateMessageInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<MessageOutputDto>> {
    return await this.messagesService.sendMessage(createMessageInput, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteMessage(
    @Args('id') id: number,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.messagesService.deleteMessage(id, user);
  }

  @Mutation(() => MessageOutputDto)
  @UseGuards(GqlAuthGuard)
  async updateMessage(
    @Args({ name: 'updateMessageArgs', type: () => UpdateMessageInput })
    updateMessageArgs: UpdateMessageInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<MessageOutputDto>> {
    return await this.messagesService.updateMessage(updateMessageArgs, user);
  }

  @Query(() => [MessageOutputDto])
  @UseGuards(GqlAuthGuard)
  async getMessages(
    @Args({ name: 'getMessagesArgs', type: () => GetMessagesInput })
    getMessagesArgs: GetMessagesInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<MessageOutputDto[]> {
    return await this.messagesService.getMessages(getMessagesArgs, user);
  }

  @Query(() => [MessageOutputDto])
  @UseGuards(GqlAuthGuard)
  async getUnreadedMessages(
    @CurrentUser() user: Partial<User>,
  ): Promise<MessageOutputDto[]> {
    return await this.messagesService.getUnreadedMessages(user);
  }
}
