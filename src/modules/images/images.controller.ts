import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImageDto } from "./dto/image.dto";
import { uploadFile } from "src/common/interceptors/uploadFile.interceptor";
import { ApiConsumes } from "@nestjs/swagger";
import { MalterFile } from "src/common/utils/multer.util";
import { SwaggerConsumes } from "src/common/enum/swagger-consumes.enum";


@Controller("images")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}



  @Post()
  @UseInterceptors(uploadFile("image"))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(@Body() imageDto: ImageDto,
  @UploadedFile(
    new ParseFilePipeBuilder()
    .addMaxSizeValidator({ maxSize: 2*1024*1024 })
    .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
  ) image:MalterFile
  ) {
    return this.imagesService.create(imageDto,image);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(+id);
  }


  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imagesService.remove(+id);
  }
}
