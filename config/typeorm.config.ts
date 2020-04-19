import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthEntity } from './../src/auth/auth.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  // type: 'mysql',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'rango96@weed.com',
  // synchronize: true,
  // database: 'linguist',
  // entities: [AuthEntity],
  entities: [AuthEntity],
  type: 'postgres',
  synchronize: true,
  url:
    'postgres://uzmxwvlyasxsoq:ea43545e7c4db45466afeae051a5f470426476c7d23511a85cf8a99b0cfac100@ec2-34-195-169-25.compute-1.amazonaws.com:5432/da359mfeg3j3p3',
};
