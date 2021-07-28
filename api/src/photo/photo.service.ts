import { HttpException, Injectable } from '@nestjs/common';
import { Photo, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { generateSlug } from 'src/utils/generate_slug';
import {
  CreatePhotoInput,
  DeletePhotoInput,
  MetaPagination,
  PaginationOptions,
  PhotoOutputDto,
  PhotosWithPaginationDto,
  UpdatePhotoInput,
} from './photo.dto';
import { PhotoModel } from './photo.model';

export const bunchOfRelations: Prisma.PhotoInclude = {
  User: true,
  UserLikes: true,
  CustomTags: true,
  Files: true,
};
@Injectable()
export class PhotoService {
  constructor(private readonly prisma: PrismaService) {}

  async createPhoto(
    data: CreatePhotoInput,
    user: Partial<User>,
  ): Promise<Photo> {
    const slug = await generateSlug(6);

    const photo = await this.prisma.photo.create({
      data: { user_id: user.id, slug, ...data },
      include: bunchOfRelations,
    });

    return photo;
  }

  async getPhotoBySlug(slug: string): Promise<Partial<PhotoOutputDto>> {
    const photo = await PhotoModel({ slug });

    if (!photo.exists || photo.isDeleted()) {
      throw new HttpException('Not Exists', 404);
    }

    return photo;
  }

  async getUserPhotos(
    user: Partial<User>,
    { take, skip, page }: PaginationOptions,
  ): Promise<PhotosWithPaginationDto> {
    const where = { deleted_at: null, user_id: user.id };
    const photos = await this.getManyPhotos(
      where,
      { take, skip },
      bunchOfRelations,
    );

    if (!photos?.length) {
      throw new HttpException('No Data', 203);
    }

    const meta = await this.createMetaObject(photos, where, page, take);

    return { items: photos, meta };
  }

  async getPhotos({
    take,
    skip,
    page,
  }: PaginationOptions): Promise<PhotosWithPaginationDto> {
    const where = { deleted_at: null };
    const photos = await this.getManyPhotos(
      where,
      { take, skip },
      bunchOfRelations,
    );

    if (!photos?.length) {
      throw new HttpException('No Data', 203);
    }

    const meta = await this.createMetaObject(photos, where, page, take);

    return { items: photos, meta };
  }

  async getLikedPhotos(
    user: Partial<User>,
    { take, skip, page }: PaginationOptions,
  ): Promise<PhotosWithPaginationDto> {
    const where: Prisma.PhotoWhereInput = {
      deleted_at: null,
      UserLikes: {
        some: {
          user_id: user.id,
          is_liked: true,
        },
      },
    };

    const photos = await this.getManyPhotos(
      where,
      { take, skip },
      bunchOfRelations,
    );

    if (!photos?.length) {
      throw new HttpException('No Data', 203);
    }

    const meta = await this.createMetaObject(photos, where, page, take);

    return { items: photos, meta };
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
    { take, skip }: PaginationOptions,
    relations: Prisma.PhotoInclude,
  ): Promise<PhotoOutputDto[]> {
    const photos = await this.prisma.photo.findMany({
      take,
      skip,
      include: relations,
      where,
      orderBy: {
        created_at: 'desc',
      },
    });

    return photos;
  }

  private async countPhotos(where: Prisma.PhotoWhereInput): Promise<number> {
    return await this.prisma.photo.count({ where });
  }

  private async createMetaObject(
    photos: PhotoOutputDto[],
    where: Prisma.PhotoWhereInput,
    page: number,
    take: number,
  ): Promise<MetaPagination> {
    const totalItems = await this.countPhotos(where);
    const itemCount = photos?.length;
    const totalPages = Math.round(totalItems / take);
    const currentPage = page;

    return {
      totalItems,
      itemCount,
      totalPages,
      currentPage,
    };
  }
}
