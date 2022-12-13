import {Entity, IEntityGenerator, ManyToOne, Property} from "@mikro-orm/core";
import {BaseEntity} from "./BaseEntity";
import {Species} from "./Species";
import {Point} from "../types/Point";
import {PointType} from "../types/PointType";

@Entity()
export class Tree extends BaseEntity {
    @Property({type: PointType})
    point: Point;

    @Property({type: "float"})
    height: number;

    @Property()
    trunkCircumference: number;

    @Property()
    careState: string;

    @Property({default: false})
    strikingForLandscape: boolean;

    @Property({type: "bigint"})
    yearOfPlanting: number;

    @Property()
    cropSize: number;

    @Property()
    juiceAmount: number;

    @Property({default: false})
    sponsorSearched: boolean;

    @Property({default: true})
    active: boolean;

    @ManyToOne()
    species: Species;

    constructor(point: Point,
                species: Species,
                height: number,
                trunkCircumference: number,
                careState: string,
                strikingForLandscape: boolean,
                yearOfPlanting: number,
                cropSize: number,
                juiceAmount: number,
                sponsorSearched: boolean,
                active: boolean) {
        super();
        this.point = point;
        this.height = height;
        this.trunkCircumference = trunkCircumference;
        this.careState = careState;
        this.strikingForLandscape = strikingForLandscape;
        this.yearOfPlanting = yearOfPlanting;
        this.cropSize = cropSize;
        this.juiceAmount = juiceAmount;
        this.sponsorSearched = sponsorSearched;
        this.active = active;
        this.species = species
    }
}

export interface Tree extends IEntityGenerator {
}

