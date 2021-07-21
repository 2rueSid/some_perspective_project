import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

// @Injectable()
// export class AppService {
//   constructor(private prisma: PrismaService) {}

//   async getUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
//     const user = this.prisma.user.findUnique({ where });

//     return user;
//   }

//   async createUser(data: Prisma.UserCreateInput): Promise<User> {
//     return this.prisma.user.create({
//       data,
//     });
//   }
// }

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get('/user/:id')
//   async getUserById(@Param('id') id: string): Promise<User> {
//     return await this.appService.getUser({ id: Number(id) });
//   }

//   @Post('/user')
//   async createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
//     return await this.appService.createUser(userData);
//   }
// }
