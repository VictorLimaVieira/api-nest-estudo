import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Libera o acesso para o Front-end (Correto!)
  // Substitua o app.enableCors() por isto:
  app.enableCors({
    origin: '*', // Aceita requisições de qualquer site (Vercel, localhost, etc)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 🚨 Garante que o OPTIONS seja aceito!
    credentials: true,
  });

  // 2. Configura a validação global
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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 🚨 4. MUDANÇA AQUI: Ouve a porta que a Render mandar OU a 3000 se for local
  await app.listen(process.env.PORT || 3000);
}
bootstrap();