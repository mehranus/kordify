import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { ImageDto } from "./dto/image.dto";
import { MalterFile } from "src/common/utils/multer.util";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "./entities/image.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

import * as path from "path";
import { deleteFile } from "src/common/utils/functions.util";




@Injectable({scope:Scope.REQUEST})
export class ImagesService {

  
  constructor(
    @InjectRepository(ImageEntity) private readonly imageRepository:Repository<ImageEntity>,
    @Inject(REQUEST) private readonly req:Request,


  ){}
  async create(imageDto: ImageDto,image:MalterFile) {
    const {alt,name}=imageDto
    const location=image?.path?.slice(7)
    await this.imageRepository.insert({
      alt:alt || name,
      location,
      name,
    })
    return {message:"create images sucessfuly",location:location};
  }

  findAll() {
    return this.imageRepository.find({
      where:{},
      order:{id:"DESC"}
    });
  }

  async findOne(id: number) {
    const image =await this.imageRepository.findOne({
      where:{}
    });
    if(!image) throw new NotFoundException("not found image!")
    return image;
  }


 async remove(id: number) {
  const image=await this.findOne(id)
  const image_loc=image.location.slice(22)
  const fullPath = path.join("public", image_loc);
  await deleteFile(fullPath)
  await this.imageRepository.remove(image)
    return {
      message:"image remove sucssesfuly"
    };
  }
}
