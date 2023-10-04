import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/users.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: { sub: string }) {
    const user = await this.usersService.findOne({
      where: { username: jwtPayload.sub },
      relations: {notifications: {list: true}},
      order: {
        notifications: { createdAt: 'DESC' },
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
