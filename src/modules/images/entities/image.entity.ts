
import { EntityName } from "src/common/enum/entity-name.enum";
import { AfterLoad, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity(EntityName.Images)
export class ImageEntity {
  @PrimaryGeneratedColumn("increment")
    id: number;
  @Column()
  name:string
  @Column()
  location:string
  @Column()
  alt:string
  @CreateDateColumn()
  created_at:Date


  @AfterLoad()
  map(){
    this.location=`http://localhost:3000/${this.location}`
  }
  
}
