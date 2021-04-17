import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { PracticeController } from './controller/practice.controller';

@Module({
  imports: [],
  controllers: [AppController, PracticeController],
  providers: [],
})
export class AppModule {}
