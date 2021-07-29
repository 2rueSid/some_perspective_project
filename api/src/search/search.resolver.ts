import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { UserGraphQL } from 'src/user/user.dto';
import { SearchService } from './search.service';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [UserGraphQL])
  async searchByUserName(@Args('name') name: string): Promise<User[]> {
    return await this.searchService.searchUserByName(name);
  }
}
