import { Injectable } from '@nestjs/common';
import { SearchType } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { AddUSerToSearchableInput } from './search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async addUserToSearchTable(user: AddUSerToSearchableInput): Promise<boolean> {
    return !!(await this.prisma.search.create({
      data: {
        ...user,
        type: SearchType.USER,
      },
    }));
  }

  async deleteUserFromSearchTable(searchable_id: number): Promise<boolean> {
    return !!(await this.prisma.search.delete({
      where: {
        searchable_id_type: {
          searchable_id,
          type: SearchType.USER,
        },
      },
    }));
  }
}

/*
  search users  
  - search by name

  search photos
  - search by name
  - search by author
  - search by tags

  methods to:
  - add user on create to search table
  - add photo on create to search table
  - delete user on delete
  - delete photo on delete
*/
