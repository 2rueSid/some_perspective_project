import { PrismaClient, Prisma, User, File, Tags } from '@prisma/client';

interface TagsInterface extends Tags {
  update: (data: Prisma.TagsUpdateInput) => Promise<Tags>;
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
    update: async (data) => {
      const updatedPhoto = await prisma.tags.update({
        where: { id: tag.id },
        data,
      });

      return updatedPhoto;
    },
    exists: !!tag,
    ...tag,
  };
}
