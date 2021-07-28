import {
  PrismaClient,
  Prisma,
  Photo,
  User,
  UserLikes,
  File,
  Tags,
} from '@prisma/client';

interface PhotoInterface extends Photo {
  isDeleted: () => boolean;
  exists: boolean;
  User: User;
  UserLikes?: UserLikes[];
  Files?: File[];
  CustomTags?: Tags[];
}

export const photosWithRelations = Prisma.validator<Prisma.PhotoArgs>()({
  include: {
    User: true,
    UserLikes: true,
    Files: true,
    CustomTags: true,
  },
});

export async function PhotoModel(
  where: Prisma.UserWhereUniqueInput,
): Promise<PhotoInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const photo: Prisma.PhotoGetPayload<typeof photosWithRelations> =
    await prisma.photo.findUnique({
      where,
      include: {
        User: true,
        UserLikes: true,
        Files: true,
        CustomTags: true,
      },
    });

  return {
    isDeleted: () => {
      return !!photo.deleted_at;
    },
    exists: !!photo,
    ...photo,
  };
}
