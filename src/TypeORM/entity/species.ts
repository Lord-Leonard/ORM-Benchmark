import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Tree} from "./tree";

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @OneToMany('Tree', 'species')
  trees: Tree[]
}
