import { Query, Mutation, Resolver } from '@nestjs/graphql';
import { FriendListService } from './friend_list.service';

@Resolver()
export class FriendListResolver {
  constructor(private readonly friendListService: FriendListService) {}
}
