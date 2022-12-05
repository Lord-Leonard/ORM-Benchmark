import "reflect-metadata"
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import {Point} from "geojson";
import {SpeciesModel} from "./species.model.js";

@Entity()
export class TreeModel {
  @PrimaryGeneratedColumn()
  id: string

  @Column({ type: "geometry" })
  point: Point;

  @Column()
  height: number;

  @Column()
  trunkCircumference: number;

  @Column()
  careState: string;

  @Column({ default: false })
  strikingForLandscape: boolean;

  @Column({type: "timestamp"})
  yearOfPlanting: number;

  @Column({type: "double"})
  cropSize: number;

  @Column({ type: "double"})
  juiceAmount: number;

  @Column({ default: false })
  sponsorSearched: boolean;

  @Column({ default: true })
  active: boolean;

  @OneToMany(()=> SpeciesModel, (species)=> species.trees)
  species: SpeciesModel;
}
