import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { PublicProfileService } from './public_profile.service';

@Resolver()
export class PublicProfileResolver {
  constructor(private readonly publicProfileService: PublicProfileService) {}
}
