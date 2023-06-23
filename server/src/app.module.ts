import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://mongotest:2sbDGclAx9plx0vV@cluster0.6p7mskr.mongodb.net/nestjs-test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
