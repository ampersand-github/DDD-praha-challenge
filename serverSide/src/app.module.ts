import { Module } from '@nestjs/common';
import { PracticeController } from './controller/practice.controller';
import { ParticipantController } from './controller/participant.controller';
import { TaskController } from './controller/task.controller';

@Module({
  imports: [],
  controllers: [PracticeController, ParticipantController, TaskController],
  providers: [],
})
export class AppModule {}
