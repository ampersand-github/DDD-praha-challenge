import { Module } from '@nestjs/common';
import { TaskController } from './controller/taskController';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [],
})
export class AppModule {}
