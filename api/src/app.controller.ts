import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.appService.getUser({ id: Number(id) });
  }

  @Post('/user')
  async createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return await this.appService.createUser(userData);
  }
}
