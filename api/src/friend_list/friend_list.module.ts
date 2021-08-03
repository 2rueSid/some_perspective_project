import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma_client/prisma.module';
import { FriendListResolver } from './friend_list.resolver';
import { FriendListService } from './friend_list.service';

@Module({
  imports: [PrismaModule],
  providers: [FriendListResolver, FriendListService],
  exports: [FriendListResolver, FriendListService],
})
export class FriendList {}
