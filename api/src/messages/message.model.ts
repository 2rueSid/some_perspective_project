import { PrismaClient, Prisma, User, Message } from '@prisma/client';

interface MessageInterface extends Message {
  delete: () => Promise<boolean>;
  isOwner: (user_id: number) => boolean;
  exists: boolean;
  User: User;
}

export const MessageWithRelations = Prisma.validator<Prisma.MessageArgs>()({
  include: {
    User: true,
  },
});

export async function MessageRelations(
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
    exists: !!message,
    ...message,
  };
}
