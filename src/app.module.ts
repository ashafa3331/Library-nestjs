import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { Todo } from './todo/entities/todo.entity';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/entity/profile.entity';

@Module({
  imports: [UserModule,
  TypeOrmModule.forRoot({
    type: 'postgres',

      host: process.env.DB_HOST,
      port: 5432 ,
      username: process.env.POSTGRESS_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRESS_DB,
    entities:[User,Todo,Profile],
    synchronize: true,
  }),
  UserModule,
  AuthModule,
  TodoModule,
  ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
