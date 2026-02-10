import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // a vitrine do swagger:
  const config = new DocumentBuilder()
  .setTitle('API Idoso Conectado')
  .setDescription('Documentação da API para o projeto de inclusão digital')
  .setVersion('1.0')
  .addTag('Users')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // site ficará em /api

  await app.listen(3000);
}
bootstrap();
