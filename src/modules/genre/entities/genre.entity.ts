import { EntityName } from "src/common/enum/entity-name.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity(EntityName.Genre)
export class GenreEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  imageUrl?: string;

}
