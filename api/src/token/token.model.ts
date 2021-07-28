import { PrismaClient, Prisma, UserTokens, User } from '@prisma/client';
import { isFuture } from 'date-fns';

interface TokenInterface extends UserTokens {
  exists: boolean;
  user?: User;
  is_valid: () => boolean;
}

export async function TokenModel(
  where: Prisma.UserTokensWhereUniqueInput,
): Promise<TokenInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const token: UserTokens = await prisma.userTokens.findUnique({
    where,
    include: {
      User: true,
    },
  });

  return {
    exists: !!token,
    is_valid: () => {
      if (!!!token) return false;

      if (!isFuture(token.lifetime)) {
        prisma.userTokens.delete({ where: { id: token.id } });
        return false;
      }

      return true;
    },
    ...token,
  };
}
