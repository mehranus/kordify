import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {

  @ApiProperty({ example: 'Pop', description: 'نام سبک موسیقی' })
  name: string;

  @ApiProperty({ example: 'Popular mainstream music', required: false })
  description?: string;

  @ApiProperty({ example: 'https://example.com/pop.jpg', required: false })
  imageUrl?: string;
}
