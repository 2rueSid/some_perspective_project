import { Injectable } from '@nestjs/common';
import { Photo, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { generateSlug } from 'src/utils/generate_slug';
import { CreatePhotoInput } from './photo.dto';

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
