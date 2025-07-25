import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const dotenvPath = path.resolve(process.cwd(), '.env.development');
const result = dotenv.config({ path: dotenvPath });

if (result.error) {
    //     do nothing
}

function getTypeOrmConfig(configService: ConfigService): DataSourceOptions {
    return {
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 5432),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: false,
        entities: ['dist/**/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*.js'],
        migrationsRun: false,
        logging: true,
    };
}

export const databaseConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
        getTypeOrmConfig(configService),
};

const dataSource = new DataSource(getTypeOrmConfig(new ConfigService()));
export const dataSourceOptions = getTypeOrmConfig(new ConfigService());

export default dataSource;
