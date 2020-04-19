import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Minimun password length is 6' })
  password: string;
}
