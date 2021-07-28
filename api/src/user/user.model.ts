import { PrismaClient, User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

interface UserInterface extends User {
  isDeleted: () => boolean;
  comparePasswords: (givenPassword: string) => Promise<boolean>;
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
    comparePasswords: async (givenPassword: string) => {
      return await !!bcrypt.compare(givenPassword, user.password);
    },
    exists: !!user,
    ...user,
  };
}
