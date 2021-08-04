import { PrismaClient, Prisma, User, Message } from '@prisma/client';
import { MessageOutputDto, UpdateMessageInput } from './message.dto';

interface MessageInterface extends Message {
  delete: () => Promise<boolean>;
  isOwner: (user_id: number) => boolean;
  update: (data: UpdateMessageInput) => Promise<Partial<MessageOutputDto>>;
  isDeleted: boolean;
  exists: boolean;
  User: User;
}

export const MessageWithRelations = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    User: true,
  },
});

export async function MessageModel(
  where: Prisma.MessageWhereUniqueInput,
): Promise<MessageInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const message: Prisma.MessageGetPayload<typeof MessageWithRelations> =
    await prisma.message.findUnique({
      where,
      include: {
        User: true,
      },
    });

  return {
    delete: async () => {
      const res = await prisma.message.update({
        where: {
          id: message.id,
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      return !!res;
    },
    isOwner: (userId) => {
      return message.user_id === userId;
    },
    update: async (data) => {
      return await prisma.message.update({
        where: {
          id: message.id,
        },
        data,
        include: {
          User: true,
        },
      });
    },
    isDeleted: !!message.deleted_at,
    exists: !!message,
    ...message,
  };
}
