import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import 'dotenv/config';
import * as process from 'process';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true
  }));
  const config = new DocumentBuilder()
    .setTitle('Portfolio')
    .setDescription('')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header'
      },
      'access-token', // This name can be anything, it's just a reference
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log('http://localhost:'+process.env.PORT+"/api");
}
bootstrap();
