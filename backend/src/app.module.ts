import { Module } from '@nestjs/common';
import { TaskController } from './controller/taskController';
import { ConfigModule } from '@nestjs/config';
import { ParticipantController } from './controller/participantController';
import { PairController } from './controller/pairController';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全てのmoduleで使用できるように
      envFilePath: "./.env",
    }),
  ],
  controllers: [TaskController, ParticipantController, PairController],
  providers: [],
})
export class AppModule {}
