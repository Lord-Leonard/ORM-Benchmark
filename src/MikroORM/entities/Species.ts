import {Entity, IEntityGenerator, Property} from "@mikro-orm/core";
import {BaseEntity} from "./BaseEntity";

@Entity()
export class Species extends BaseEntity{
  @Property()
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export interface Species extends IEntityGenerator { }
