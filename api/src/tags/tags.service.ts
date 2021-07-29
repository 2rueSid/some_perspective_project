import { Injectable } from '@nestjs/common';
import { Tags, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { CreateTagsInput, TagsOutputDto } from './tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTag(
    data: CreateTagsInput,
    user: Partial<User>,
  ): Promise<Partial<TagsOutputDto>> {
    const tag = await this.prisma.tags.create({
      data: { user_id: user.id, ...data },
    });

    return tag;
  }

  // async updateTag(
  //   user: Partial<User>,
  //   data: Partial<CreateTagsInput>,
  // ): Promise<Partial<TagsOutputDto>> {

  // }
}

/*
  create
  update by user_id
  delete by user_id
  get all 
  get by photo id
  get by user_id
*/
