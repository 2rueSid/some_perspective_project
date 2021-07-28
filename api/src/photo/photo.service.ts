import { HttpException, Injectable } from '@nestjs/common';
import { Photo, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { generateSlug } from 'src/utils/generate_slug';
import {
  CreatePhotoInput,
  PaginationOptions,
  PhotoOutputDto,
} from './photo.dto';
import { PhotoModel } from './photo.model';

export const PHOTO_TAKE = 20;
export const PHOTO_SKIP = 1;

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
    const photos = await this.prisma.photo.findMany({
      take: PHOTO_TAKE,
      skip: PHOTO_SKIP,
      cursor: {
        id: cursor,
      },
      include: {
        User: true,
        UserLikes: true,
        CustomTags: true,
        Files: true,
      },
      where: {
        user_id: user.id,
        deleted_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return photos;
  }
}

// GRUD
/*
  Create photo
  Get photo
  Get user photos
  Get Photos
  Get user liked photos
  Update photo
  Delete photo
*/
