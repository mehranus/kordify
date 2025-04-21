import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity) private readonly genreRepository:Repository<GenreEntity>
  ){}
  async create(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create(createGenreDto);
     await this.genreRepository.save(genre);

     return{
      message:"create genre sucsesfuly",
      status:201
     }
  }

  async findAll(): Promise<GenreEntity[]> {
    return await this.genreRepository.find();
  }

  async findOne(id: number): Promise<GenreEntity> {
    const genre = await this.genreRepository.findOneBy({ id });
    if (!genre) throw new NotFoundException('Genre not found');
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre = await this.findOne(id);
    const updated = Object.assign(genre, updateGenreDto);
     await this.genreRepository.save(updated);
     return{
      message:"update genre sucsesfuly",
      status:200
     }
  }

  async remove(id: number) {
    const genre = await this.findOne(id);
    await this.genreRepository.remove(genre);
    return{
      message:"delete genre sucsesfuly",
      status:200
     }
  }
}
