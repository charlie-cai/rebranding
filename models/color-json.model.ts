import "reflect-metadata";
import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, ValidateNested } from "class-validator";
import { ColorGroup } from "./color-group.model";
import { ColorToken } from "./color-token.model";

export class ColorJson {

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique((o) => o.name)
    @ValidateNested({ each: true })
    @Type(() => ColorGroup)
    groups: ColorGroup[];

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique((o) => o.name)
    @ArrayUnique((o) => o.hex)
    @ValidateNested({ each: true })
    @Type(() => ColorToken)
    tokens: ColorToken[];
}