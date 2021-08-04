import { PrismaClient, Prisma, Conversation, Message } from '@prisma/client';

interface ConversationInterface extends Conversation {
  isDeleted: boolean;
  exists: boolean;
  Message: Message[];
}

export const ConversationWithRelation =
  Prisma.validator<Prisma.ConversationArgs>()({
    include: {
      Message: true,
    },
  });

export async function ConversationModel(
  where: Prisma.ConversationWhereUniqueInput,
): Promise<ConversationInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const conversation: Prisma.ConversationGetPayload<
    typeof ConversationWithRelation
  > = await prisma.conversation.findUnique({
    where,
    include: {
      Message: true,
    },
  });

  return {
    isDeleted: !!conversation.deleted_at,
    exists: !!conversation,
    ...conversation,
  };
}
