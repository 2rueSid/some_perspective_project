import {
  PrismaClient,
  Prisma,
  Photo,
  User,
  UserLikes,
  File,
  Tags,
} from '@prisma/client';
import { bunchOfRelations } from './photo.service';

interface PhotoInterface extends Photo {
  isDeleted: () => boolean;
  isOwner: (userId: number) => boolean;
  delete: () => Promise<boolean>;
  update: (data: Prisma.PhotoUpdateInput) => Promise<Photo>;
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
    isOwner: (userId) => {
      if (photo.user_id === userId) return true;
      return false;
    },
    delete: async () => {
      const res = await prisma.photo.update({
        where: { id: photo.id },
        data: { deleted_at: new Date().toISOString() },
      });

      return !!res;
    },
    update: async (data) => {
      const updatedPhoto = await prisma.photo.update({
        where: { id: photo.id },
        data,
        include: bunchOfRelations,
      });

      return updatedPhoto;
    },
    exists: !!photo,
    ...photo,
  };
}
