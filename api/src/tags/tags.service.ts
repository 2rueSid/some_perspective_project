import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Tags, User } from '@prisma/client';
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

  async getTagsByPhotoId(photo_id): Promise<TagsOutputDto[]> {
    return await this.getTagsWithCustomCondition({ photo_id });
  }

  async getTagsByUserId(user_id: number): Promise<TagsOutputDto[]> {
    return await this.getTagsWithCustomCondition({ user_id });
  }

  async getTagsByName(name: string): Promise<TagsOutputDto[]> {
    return await this.getTagsWithCustomCondition({
      name: {
        startsWith: name,
      },
    });
  }

  private async getTagsWithCustomCondition(
    where: Prisma.TagsWhereInput,
  ): Promise<TagsOutputDto[]> {
    return await this.prisma.tags.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
