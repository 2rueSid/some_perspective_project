import { PrismaClient, User, Prisma } from '@prisma/client';

interface UserInterface extends User {
  isDeleted: () => boolean;
  exists: boolean;
}

export async function UserModel(
  where: Prisma.UserWhereUniqueInput,
): Promise<UserInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const user: User = await prisma.user.findUnique({ where });

  return {
    isDeleted: () => {
      return !!user.deleted_at;
    },
    exists: !!user,
    ...user,
  };
}
