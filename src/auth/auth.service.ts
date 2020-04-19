import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './auth.dto';
import { AuthEntity } from './auth.entity';
import { AuthRepo } from './auth.repository';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepo) private readonly authRepo: AuthRepo,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authDto: AuthDto): Promise<AuthEntity> {
    return await this.authRepo.signUp(authDto);
  }

  async signIn(authDto: AuthDto): Promise<{ accessToken: string }> {
    try {
      const { email } = await this.authRepo.validateUser(authDto);
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
