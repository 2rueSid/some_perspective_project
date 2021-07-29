import {
  PrismaClient,
  Prisma,
  PhotoComments,
  User,
  Photo,
  CommentReplies,
  CommentReactions,
} from '@prisma/client';

interface PhotoCommentsI extends PhotoComments {
  delete: () => Promise<boolean>;
  update: (data: Prisma.PhotoCommentsUpdateInput) => Promise<PhotoComments>;
  isOwner: (user_id: number) => boolean;
  exists: boolean;
  User?: User;
  Photo?: Photo;
  CommentReplies?: CommentReplies[];
  CommentReactions?: CommentReactions[];
}

export const PhotoCommentsRelation =
  Prisma.validator<Prisma.PhotoCommentsArgs>()({
    include: {
      User: true,
      Photo: true,
      CommentReplies: true,
      CommentReactions: true,
    },
  });

export async function PhotoCommentsModel(
  where: Prisma.PhotoCommentsWhereUniqueInput,
): Promise<PhotoCommentsI> {
  const prisma: PrismaClient = new PrismaClient();

  const comment: Prisma.PhotoCommentsGetPayload<typeof PhotoCommentsRelation> =
    await prisma.photoComments.findUnique({
      where,
      include: {
        User: true,
        Photo: true,
        CommentReactions: true,
        CommentReplies: true,
      },
    });

  return {
    delete: async () => {
      const res = await prisma.photoComments.update({
        where: {
          id: comment.id,
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      return !!res;
    },
    isOwner: (userId) => {
      return comment?.user_id === userId;
    },
    update: async (data) => {
      const updatedComment = await prisma.photoComments.update({
        where: {
          id: comment.id,
        },
        data: { ...data, is_seen: true },
      });

      return updatedComment;
    },
    exists: !!comment,
    ...comment,
  };
}
