import "reflect-metadata"
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import {Point} from "geojson";
import {Species} from "./species";

@Entity()
export class Tree {
  @PrimaryGeneratedColumn()
  id: string

  @Column({type: "geometry"})
  point: Point;

  @Column("float")
  height: number;

  @Column()
  trunkCircumference: number;

  @Column()
  careState: string;

  @Column({default: false})
  strikingForLandscape: boolean;

  @Column("bigint")
  yearOfPlanting: number;

  @Column()
  cropSize: number;

  @Column()
  juiceAmount: number;

  @Column({default: false})
  sponsorSearched: boolean;

  @Column({default: true})
  active: boolean;

  @ManyToOne(() => Species, (species) => species.trees)
  species: Species;
}
