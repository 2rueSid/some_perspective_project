import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { configModule } from 'src/config.module';

import { PrismaModule } from 'src/prisma_client/prisma.module';
import { PrismaService } from 'src/prisma_client/prisma.service';
import { TokenModule } from 'src/token/token.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20d' },
    }),
    TokenModule,
    configModule,
  ],
  providers: [AuthService, PrismaService, AuthResolver, JwtStrategy],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
