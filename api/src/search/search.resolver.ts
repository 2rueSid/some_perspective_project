import { Query, Resolver, Args } from '@nestjs/graphql';
import { Photo, User } from '@prisma/client';
import { PhotoGraphQL } from 'src/photo/photo.dto';
import { UserGraphQL } from 'src/user/user.dto';
import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [UserGraphQL])
  async searchByUserName(@Args('name') name: string): Promise<User[]> {
    return await this.searchService.searchUserByName(name);
  }

  @Query(() => [PhotoGraphQL])
  async searchPhotos(@Args('searchable') searchable: string): Promise<Photo[]> {
    return await this.searchService.searchPhoto(searchable);
  }
}
