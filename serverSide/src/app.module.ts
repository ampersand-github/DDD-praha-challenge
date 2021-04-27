import { Module } from '@nestjs/common';
import { PracticeController } from './controller/practice.controller';
import { ParticipantController } from './controller/participant.controller';

@Module({
  imports: [],
  controllers: [PracticeController, ParticipantController],
  providers: [],
})
export class AppModule {}
