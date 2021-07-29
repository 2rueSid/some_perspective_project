import { HttpException, Injectable } from '@nestjs/common';
import { Tags, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { CreateTagsInput, DeleteTagInput, TagsOutputDto } from './tags.dto';
import { TagsModel } from './tags.model';

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

  async deleteTag(
    { id: userId }: Partial<User>,
    { id }: DeleteTagInput,
  ): Promise<boolean> {
    const tag = await TagsModel({ id });

    if (!tag.exists) {
      throw new HttpException('Not Exists', 404);
    }

    if (!tag.isOwner(userId)) {
      throw new HttpException('Permission denied', 405);
    }

    return tag.delete();
  }


}

/*
  create
  delete by user_id
  get by photo id
  get by user_id
  get by name
*/
