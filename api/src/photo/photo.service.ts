import { HttpException, Injectable } from '@nestjs/common';
import { Photo, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { generateSlug } from 'src/utils/generate_slug';
import {
  CreatePhotoInput,
  DeletePhotoInput,
  PaginationOptions,
  PhotoOutputDto,
  UpdatePhotoInput,
} from './photo.dto';
import { PhotoModel } from './photo.model';

export const PHOTO_TAKE = 20;
export const PHOTO_SKIP = 1;

@Injectable()
export class PhotoService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly bunchOfRelations: Prisma.PhotoInclude = {
    User: true,
    UserLikes: true,
    CustomTags: true,
    Files: true,
  };

  async createPhoto(
    data: CreatePhotoInput,
    user: Partial<User>,
  ): Promise<Photo> {
    const slug = await generateSlug(6);

    const photo = await this.prisma.photo.create({
      data: { user_id: user.id, slug, ...data },
    });

    return photo;
  }

  async getPhotoBySlug(slug: string): Promise<Partial<PhotoOutputDto>> {
    const photo = await PhotoModel({ slug });

    if (!photo.exists) {
      throw new HttpException('Not Exists', 404);
    }

    return photo;
  }

  async getUserPhotos(
    user: Partial<User>,
    { cursor }: PaginationOptions,
  ): Promise<PhotoOutputDto[]> {
    const photos = await this.getManyPhotos(
      { deleted_at: null, user_id: user.id },
      { cursor },
      this.bunchOfRelations,
    );

    return photos;
  }

  async getPhotos({
    cursor,
  }: PaginationOptions): Promise<Partial<PhotoOutputDto[]>> {
    const photos = await this.getManyPhotos(
      { deleted_at: null },
      { cursor },
      this.bunchOfRelations,
    );

    return photos;
  }

  async getLikedPhotos(
    user: Partial<User>,
    { cursor }: PaginationOptions,
  ): Promise<Partial<PhotoOutputDto[]>> {
    const photos = await this.getManyPhotos(
      {
        deleted_at: null,
        UserLikes: {
          every: {
            user_id: user.id,
            is_liked: true,
          },
        },
      },
      { cursor },
      this.bunchOfRelations,
    );

    return photos;
  }

  async deletePhoto(
    { slug }: DeletePhotoInput,
    user: Partial<User>,
  ): Promise<boolean> {
    const photo = await PhotoModel({ slug });

    if (!photo.exists) {
      throw new HttpException('Phono not exists', 404);
    }

    if (!photo.isOwner(user.id)) {
      throw new HttpException('Not permitted', 405);
    }

    return photo.delete();
  }

  async updatePhoto(
    { slug, ...data }: UpdatePhotoInput,
    user: Partial<User>,
  ): Promise<PhotoOutputDto> {
    const photo = await PhotoModel({ slug });

    if (!photo.exists && !photo.isDeleted) {
      throw new HttpException('Phono not exists', 404);
    }

    if (!photo.isOwner(user.id)) {
      throw new HttpException('Not permitted', 405);
    }

    return await photo.update(data);
  }

  private async getManyPhotos(
    where: Prisma.PhotoWhereInput,
    { cursor }: PaginationOptions,
    relations: Prisma.PhotoInclude,
  ): Promise<PhotoOutputDto[]> {
    const photos = await this.prisma.photo.findMany({
      take: PHOTO_TAKE,
      skip: PHOTO_SKIP,
      cursor: {
        id: cursor,
      },
      include: relations,
      where,
      orderBy: {
        created_at: 'desc',
      },
    });

    return photos;
  }
}
