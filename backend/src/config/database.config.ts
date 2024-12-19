import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Todo } from '../entities/todo.entity';
import { validateDatabaseConfig } from './validate-config';

export function getDatabaseConfig(): TypeOrmModuleOptions {
  validateDatabaseConfig();

  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Todo],
    synchronize: true, //process.env.NODE_ENV !== 'production',
    logging: true,
  };
}
