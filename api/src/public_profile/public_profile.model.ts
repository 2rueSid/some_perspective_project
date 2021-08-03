import { PrismaClient, Prisma, User, UserPublicProfile } from '@prisma/client';
import { UserPublicProfileOutput } from './public_profile.dto';
interface PublicProfileInterface extends UserPublicProfile {
  delete: () => Promise<boolean>;
  isOwner: (user_id: number) => boolean;
  update: (
    data: Prisma.UserPublicProfileUpdateInput,
  ) => Promise<Partial<UserPublicProfileOutput>>;
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
  where: Prisma.UserPublicProfileWhereUniqueInput,
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
      const res = await prisma.userPublicProfile.update({
        where: {
          id: publicProfile.id,
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      return !!res;
    },
    update: async (data) => {
      return await prisma.userPublicProfile.update({
        where: {
          id: publicProfile.id,
        },
        data,
      });
    },
    isOwner: (userId) => {
      return publicProfile.user_id === userId;
    },
    exists: !!publicProfile,
    ...publicProfile,
  };
}
