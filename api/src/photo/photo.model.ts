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
  isOwner: (userId: number) => boolean;
  delete: () => boolean;
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
    isOwner: (userId: number) => {
      if (photo.user_id === userId) return true;
      return false;
    },
    delete: () => {
      const res = prisma.photo.update({
        where: { id: photo.id },
        data: { deleted_at: Date() },
      });

      return !!res;
    },
    exists: !!photo,
    ...photo,
  };
}
