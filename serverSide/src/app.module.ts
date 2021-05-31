import { Module } from '@nestjs/common';
import { ParticipantController } from './controller/participantController';
import { TaskController } from './controller/taskController';

@Module({
  imports: [],
  controllers: [ParticipantController, TaskController],
  providers: [],
})
export class AppModule {}
