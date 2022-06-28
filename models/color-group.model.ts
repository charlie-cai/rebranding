
import "reflect-metadata";
import { Type } from "class-transformer";
import { ArrayNotEmpty, ArrayUnique, IsArray, ValidateNested } from "class-validator";
import { ColorSemantic } from "./color-semantic.model";
import { IsValidColorGroupName } from "./validator/is-valid-color-group-name.validator";

export class ColorGroup {

    @IsValidColorGroupName()
    name: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique((o) => o.name)
    @ValidateNested({ each: true })
    @Type(() => ColorSemantic)
    colors: ColorSemantic[];
}