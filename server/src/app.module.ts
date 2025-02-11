import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { RedisClientOptions } from '@songkeys/nestjs-redis'
import { JwtAuthGuard } from 'src/common/guards/auth.guard'
import { PermissionGuard } from 'src/common/guards/permission.guard'

import { RolesGuard } from './common/guards/roles.guard'
import configuration from './config/index'
import { AxiosModule } from './module/axios/axios.module'
import { MainModule } from './module/main/main.module'
import { CacheModule } from './module/monitor/cache/cache.module'
import { LoginlogModule } from './module/monitor/loginlog/loginlog.module'
import { OnlineModule } from './module/monitor/online/online.module'
import { OperlogModule } from './module/monitor/operlog/operlog.module'
import { ServerModule } from './module/monitor/server/server.module'
import { RedisModule } from './module/redis/redis.module'
import { AuthModule } from './module/system/auth/auth.module'
import { SysConfigModule } from './module/system/config/config.module'
import { DeptModule } from './module/system/dept/dept.module'
import { DictModule } from './module/system/dict/dict.module'
import { GuessModule } from './module/system/guess/guess.module'
import { MenuModule } from './module/system/menu/menu.module'
import { NoticeModule } from './module/system/notice/notice.module'
import { PostModule } from './module/system/post/post.module'
import { RoleModule } from './module/system/role/role.module'
import { ToolModule } from './module/system/tool/tool.module'
import { UserModule } from './module/system/user/user.module'
import { TasksModule } from './module/tasks/tasks.module'
import { UploadModule } from './module/upload/upload.module'

@Global()
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 定时任务
    ScheduleModule.forRoot(),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const mysqlConfig = config.get('db.mysql')
        return {
          type: 'mysql',
          host: mysqlConfig.host,
          port: mysqlConfig.port,
          username: mysqlConfig.username,
          password: mysqlConfig.password,
          database: mysqlConfig.database,
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          timezone: '+08:00',
          synchronize: true, // 自动同步数据库表结构
          logging: true, // 显示 SQL 日志，方便调试
          ...mysqlConfig,
        } as TypeOrmModuleOptions
      },
    }),
    // redis
    RedisModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            closeClient: true,
            readyLog: true,
            errorLog: true,
            config: config.get<RedisClientOptions>('redis'),
          }
        },
      },
      true,
    ),
    HttpModule,
    AuthModule,
    UserModule,
    ToolModule,
    DeptModule,
    DictModule,
    GuessModule,
    MenuModule,
    RoleModule,
    PostModule,
    SysConfigModule,
    NoticeModule,
    MainModule,
    CacheModule,
    LoginlogModule,
    OperlogModule,
    AxiosModule,
    OnlineModule,
    ServerModule,
    UploadModule,
    TasksModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
