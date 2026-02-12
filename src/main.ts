import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Libera o acesso para o Front-end
  app.enableCors();

  // 2. Configura a validação global (Deve vir ANTES do listen)
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // 3. Configura a vitrine do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Idoso Conectado')
    .setDescription('Documentação da API para o projeto de inclusão digital')
    .setVersion('1.0')
    .addBearerAuth() // ADICIONE ISSO: Cria o botão de cadeado para o Token no Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 4. SÓ AGORA liga o servidor (Uma única vez no final)
  await app.listen(3000);
}
bootstrap();