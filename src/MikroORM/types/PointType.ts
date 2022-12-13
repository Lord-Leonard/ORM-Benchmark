import {Type} from "@mikro-orm/core";
import {Point} from "./Point";

export class PointType extends Type<Point | undefined, string | undefined> {

    convertToDatabaseValue(value: Point | undefined): string | undefined {
        if (!value) {
            return undefined;
        }

        return `point(${value.latitude} ${value.longitude})`;
    }

    convertToJSValue(value: string | undefined): Point | undefined {
        const m = value?.match(/point\((-?\d+(\.\d+)?) (-?\d+(\.\d+)?)\)/i);

        if (!m) {
            return undefined;
        }

        return new Point(+m[1], +m[3]);
    }

    convertToJSValueSQL(key: string) {
        return `ST_AsText(${key})`;
    }

    convertToDatabaseValueSQL(key: string) {
        return `ST_PointFromText(${key})`;
    }

    getColumnType(): string {
        return 'geometry';
    }

}

