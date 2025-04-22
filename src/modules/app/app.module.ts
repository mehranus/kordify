import { Module } from '@nestjs/common';
import { GenreModule } from '../genre/genre.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { ImagesModule } from '../images/images.module';


@Module({
  imports: [GenreModule,ImagesModule,TypeOrmModule.forRoot(typeOrmConfig())],
  controllers: [],
  providers: [],
})
export class AppModule {}
