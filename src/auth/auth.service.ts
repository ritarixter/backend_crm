import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  auth(user: { username: string }) {
    const payload = { sub: user.username };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '15d' }),
    };
  }

  async getNewToken({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken)
      throw new UnauthorizedException('Пожалуйста войдите в систему!');
    const result: any = await this.jwtService.verify(refreshToken);
    if (!result) throw new UnauthorizedException('Невадлидный токен!');

    const user = await this.usersService.findOne({
      where: { username: result.sub },
    }); //? sub.username?

    const payload = { sub: user.username };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '15d' }),
    };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOne({
      where: { username },
      select: {
        username: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        password: true,
      },
    });

    const result = await bcrypt.compare(password, user.password);
    if (result) {
      return user;
    } else {
      throw new ForbiddenException({
        message: 'Неверный логин или пароль',
        status: 403,
      });
    }
  }
}
