import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'sochivas',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}'
     ],
      synchronize: true,
      keepConnectionAlive: true, 
      autoLoadEntities: true,
      
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), '../', '/s/dist/melsp/'),
    //   serveRoot: '/melsp',
    //   exclude: ['/api*'],
    // }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
