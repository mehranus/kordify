import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {  ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { join } from 'path';
import { swagerConfigInit } from './config/swagger.config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  config({path:join(process.cwd(),'.env')})
  swagerConfigInit(app)
  
  const {PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    console.log(`swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();


