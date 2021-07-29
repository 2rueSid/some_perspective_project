import { HttpException, Injectable } from '@nestjs/common';
import { SearchType, User } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';
import {
  AddPhotoToSearchableInput,
  AddUSerToSearchableInput,
} from './search.dto';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUserByName(name: string): Promise<User[]> {
    const searchResults = await this.prisma.search.findMany({
      where: {
        searchable: {
          contains: name,
        },
        type: SearchType.USER,
      },
      select: {
        searchable_id: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!searchResults?.length) {
      throw new HttpException('Not Found', 404);
    }

    const mappedIds = searchResults.map((v) => v.searchable_id);

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: mappedIds,
        },
      },
    });

    return await users;
  }

  async addPhotoToSearchableTable(
    photo: AddPhotoToSearchableInput,
  ): Promise<boolean> {
    return !!(await this.prisma.search.create({
      data: { ...photo, type: SearchType.PHOTO },
    }));
  }

  async deletePhotoFromSearchable(searchable_id: number): Promise<boolean> {
    return !!(await this.prisma.search.delete({
      where: {
        searchable_id_type: {
          searchable_id,
          type: SearchType.PHOTO,
        },
      },
    }));
  }

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
