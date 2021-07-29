import { PrismaClient, Prisma, User, File, Tags } from '@prisma/client';

interface TagsInterface extends Tags {
  delete: () => Promise<boolean>;
  isOwner: (user_id: number) => boolean;
  exists: boolean;
  User: User;
  Files?: File[];
}

export const TagsWithRelations = Prisma.validator<Prisma.TagsArgs>()({
  include: {
    User: true,
    Photo: true,
  },
});

export async function TagsModel(
  where: Prisma.TagsWhereUniqueInput,
): Promise<TagsInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const tag: Prisma.TagsGetPayload<typeof TagsWithRelations> =
    await prisma.tags.findUnique({
      where,
      include: {
        User: true,
        Photo: true,
      },
    });

  return {
    delete: async () => {
      const res = await prisma.tags.delete({
        where: {
          id: tag.id,
        },
      });

      return !!res;
    },
    isOwner: (userId) => {
      return tag.user_id === userId;
    },
    exists: !!tag,
    ...tag,
  };
}
