import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // todo 疑問 例外処理やログについて
    // Nest.jsにおいてドメイン層のエラーをHttpErrorにどうやって伝播すべきか
    // そもそもドメイン層のエラーを詳細に返すべきか？
    // {"statusCode":500,"message":"Internal server error"}%
    // アプリケーションログのとり方
    logger: ['log', 'error', 'warn', 'debug'], //, 'verbose'
  });
  await app.listen(3000);
}
bootstrap().then();
