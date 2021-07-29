import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import { CreateTagsInput, DeleteTagInput, TagsOutputDto } from './tags.dto';
import { TagsService } from './tags.service';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => TagsOutputDto)
  @UseGuards(GqlAuthGuard)
  async createTag(
    @Args({ name: 'createTagData', type: () => CreateTagsInput })
    createTagData: CreateTagsInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<TagsOutputDto>> {
    return await this.tagsService.createTag(createTagData, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteTag(
    @Args({ name: 'tag_id', type: () => DeleteTagInput })
    deleteDatData: DeleteTagInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.tagsService.deleteTag(user, deleteDatData);
  }
}

// createTag;
// deleteTag;
// getTagsByPhotoId;

// getTagsByUserId;
// getTagsByName;
