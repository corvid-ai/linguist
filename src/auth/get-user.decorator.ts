import { createParamDecorator } from '@nestjs/common';
import { AuthEntity } from './auth.entity';

export const GetUser = createParamDecorator(
  (data, req): AuthEntity => req.user,
);
