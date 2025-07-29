import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { UserLogsModule } from './modules/user-logs/user-logs.module';
import { AiModelsModule } from './modules/ai-models/ai-models.module';
import { AiTasksModule } from './modules/ai-tasks/ai-tasks.module';
import { SettingsModule } from './modules/settings/settings.module';
import { StatisticsModule } from './modules/statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // 不建议在生产环境中使用
      }),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    UserLogsModule,
    AiModelsModule,
    AiTasksModule,
    SettingsModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}