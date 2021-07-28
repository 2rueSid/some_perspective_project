import { UseGuards } from '@nestjs/common';
import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { GqlAuthGuard } from 'src/auth/auth.gaurd';
import { CurrentUser } from 'src/user/current_user.decorator';
import {
  CreatePhotoInput,
  DeletePhotoInput,
  PaginationOptions,
  PhotoOutputDto,
  PhotosWithPaginationDto,
  UpdatePhotoInput,
} from './photo.dto';
import { PhotoService } from './photo.service';

@Resolver()
export class PhotoResolver {
  constructor(private readonly photoService: PhotoService) {}

  @Mutation(() => PhotoOutputDto)
  @UseGuards(GqlAuthGuard)
  async createPhoto(
    @Args({ name: 'createPhotoArgs', type: () => CreatePhotoInput })
    createPhotoInput: CreatePhotoInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<PhotoOutputDto> {
    return await this.photoService.createPhoto(createPhotoInput, user);
  }

  @Mutation(() => PhotoOutputDto)
  @UseGuards(GqlAuthGuard)
  async updatePhoto(
    @Args({ name: 'updatePhotoArgs', type: () => UpdatePhotoInput })
    updatePhoto: UpdatePhotoInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<PhotoOutputDto> {
    return await this.photoService.updatePhoto(updatePhoto, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deletePhoto(
    @Args({ name: 'deletePhoto', type: () => DeletePhotoInput })
    deletePhoto: DeletePhotoInput,
    @CurrentUser() user: Partial<User>,
  ): Promise<boolean> {
    return await this.photoService.deletePhoto(deletePhoto, user);
  }

  @Query(() => PhotoOutputDto)
  async getPhotoBySlug(
    @Args('photoSlug') photoSlug: string,
  ): Promise<Partial<PhotoOutputDto>> {
    return await this.photoService.getPhotoBySlug(photoSlug);
  }

  @Query(() => PhotosWithPaginationDto)
  @UseGuards(GqlAuthGuard)
  async getUserPhotos(
    @Args({ name: 'paginationOptions', type: () => PaginationOptions })
    pagination: PaginationOptions,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<PhotosWithPaginationDto>> {
    return await this.photoService.getUserPhotos(user, pagination);
  }

  @Query(() => PhotosWithPaginationDto)
  async getPhotos(
    @Args({ name: 'paginationOptions', type: () => PaginationOptions })
    pagination: PaginationOptions,
  ): Promise<Partial<PhotosWithPaginationDto>> {
    return await this.photoService.getPhotos(pagination);
  }

  @Query(() => PhotosWithPaginationDto)
  @UseGuards(GqlAuthGuard)
  async getLikedPhotos(
    @Args({ name: 'paginationOptions', type: () => PaginationOptions })
    pagination: PaginationOptions,
    @CurrentUser() user: Partial<User>,
  ): Promise<Partial<PhotosWithPaginationDto>> {
    return await this.photoService.getLikedPhotos(user, pagination);
  }
}
