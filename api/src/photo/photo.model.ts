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

export const PhotosWithRelations = Prisma.validator<Prisma.PhotoArgs>()({
  include: {
    User: true,
    UserLikes: true,
    Files: true,
    CustomTags: true,
  },
});

export async function PhotoModel(
  where: Prisma.PhotoWhereUniqueInput,
): Promise<PhotoInterface> {
  const prisma: PrismaClient = new PrismaClient();

  const photo: Prisma.PhotoGetPayload<typeof PhotosWithRelations> =
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
