import { PrismaClient, User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserOutputDto } from 'src/auth/auth.dto';
import { UserUpdateInput } from './user.dto';

interface UserInterface extends User {
  isDeleted: () => boolean;
  comparePasswords: (givenPassword: string) => Promise<boolean>;
  update: (data: UserUpdateInput) => Promise<Partial<UserOutputDto>>;
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
    update: async (data) => {
      return await prisma.user.update({ where: { id: user.id }, data });
    },
    exists: !!user,
    ...user,
  };
}
