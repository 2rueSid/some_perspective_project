import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class CommentRepliesService {
  constructor(private readonly prisma: PrismaService) {}
}
