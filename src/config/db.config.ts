import * as path from 'path';
import { registerAs } from '@nestjs/config';
import { DataSourceOptions, DataSource } from 'typeorm';
import { config } from 'dotenv';
import {
  ENTITY_DIR,
  MIGRATION_DIR,
  TYPEORM_CONFIG,
} from '../common/constants/config';
config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)!,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEMA,
  synchronize: false,
  logging: !!process.env.LOGGING,
  entities: [__dirname + ENTITY_DIR],
  migrations: [path.resolve(__dirname, MIGRATION_DIR)],
};

export const dataSource = new DataSource(typeOrmConfig);
export default registerAs(TYPEORM_CONFIG, () => typeOrmConfig);
