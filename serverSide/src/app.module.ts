import { Module } from '@nestjs/common';
import { TaskController } from './controller/taskController';
import { TaskService } from './controller/service/task.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全てのmoduleで使用できるように
      envFilePath: `env/${process.env.NODE_ENV}.env`, // NODE_ENVの値によって読み込むファイルを変更する。
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class AppModule {}
