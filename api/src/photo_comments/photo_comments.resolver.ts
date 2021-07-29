import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { PhotoCommentsService } from './photo_comments.service';

@Resolver()
export class PhotoCommentsResolver {
  constructor(private readonly photoCommentsService: PhotoCommentsService) {}
}
