import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { AuthEntity } from './auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<AuthEntity> {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) authDto: AuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authDto);
  }
}
