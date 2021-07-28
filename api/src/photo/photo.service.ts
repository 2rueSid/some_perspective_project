import { Injectable } from '@nestjs/common';
import { Photo } from '@prisma/client';
import { PrismaService } from 'src/prisma_client/prisma.service';

@Injectable()
export class PhotoService {
  constructor(private readonly prisma: PrismaService) {}

  async createPhoto(): Promise<Photo> {
    
  }
}

// GRUD
/*
  Create photo
  Get photo
  Get user photos
  Get Photos
  Get user liked photos
  Update photo
  Delete photo
*/
