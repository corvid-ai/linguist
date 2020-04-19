import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepo } from '../auth.repository';
import { AuthEntity } from './../auth.entity';
import { JwtPayload } from './jwt-payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(AuthRepo) private authRepo: AuthRepo) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.SECRET}`,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthEntity> {
    const { email } = payload;
    const user = await this.authRepo.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
