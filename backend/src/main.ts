import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'], //, 'verbose'
  });
  /*
  "start:debug": "NODE_ENV=develop nest start --debug --watch"
  といった具合にdevelopやproductionを切り替えることができる。
  今回はここは主眼じゃないので、portの切り替え以外はやらない。
 */
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));

  console.log(configService.get("POSTGRES_USER"))
  console.log(configService.get("PORT"))
}
bootstrap().then();
