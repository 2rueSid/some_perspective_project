import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenModel } from 'src/token/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req, user: Partial<User>) {
    const token = req.headers.authorization.slice(7);

    const tokenExists = (await TokenModel({ token })).is_valid();

    if (tokenExists) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
