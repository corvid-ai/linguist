import { ConflictException, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDto } from './auth.dto';
import { AuthEntity } from './auth.entity';

@EntityRepository(AuthEntity)
export class AuthRepo extends Repository<AuthEntity> {
  async signUp(authDto: AuthDto): Promise<AuthEntity> {
    const { email, password } = authDto;
    const user = new AuthEntity();
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (err) {
      if (err.code === '23505' || 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new HttpException(err.message, 400);
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUser(authDto: AuthDto): Promise<AuthEntity> {
    const { email, password } = authDto;
    const user = await this.findOne({ email });

    if (user && user.validatePassword(password)) {
      return user;
    } else return null;
  }
}
