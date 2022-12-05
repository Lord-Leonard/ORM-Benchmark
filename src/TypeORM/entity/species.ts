import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import {TreeModel} from "./tree.model.js";

@Entity()
export class SpeciesModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToOne(()=> TreeModel,(tree)=> tree.species)
  trees: TreeModel[]
}
