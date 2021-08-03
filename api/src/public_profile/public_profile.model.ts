import { PrismaClient, Prisma, User, UserPublicProfile } from '@prisma/client';

interface PublicProfileInterface extends UserPublicProfile {
  delete: () => Promise<boolean>;
  isOwner: (user_id: number) => boolean;
  exists: boolean;
  User: User;
}

export const PublicProfileWithRelations =
  Prisma.validator<Prisma.UserPublicProfileArgs>()({
    include: {
      User: true,
    },
  });

export async function PublicProfileModel(
  where: Prisma.TagsWhereUniqueInput,
): Promise<PublicProfileInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const publicProfile: Prisma.UserPublicProfileGetPayload<
    typeof PublicProfileWithRelations
  > = await prisma.userPublicProfile.findUnique({
    where,
    include: {
      User: true,
    },
  });

  return {
    delete: async () => {
      const res = await prisma.userPublicProfile.delete({
        where: {
          id: publicProfile.id,
        },
      });

      return !!res;
    },
    isOwner: (userId) => {
      return publicProfile.user_id === userId;
    },
    exists: !!publicProfile,
    ...publicProfile,
  };
}
