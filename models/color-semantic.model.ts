import "reflect-metadata";
import { IsNotEmpty, IsString } from 'class-validator';
import { IsValidColorTokenName } from './validator';
import { IsValidColorSemanticName } from "./validator/is-valid-color-semantic-name.validator";

export class ColorSemantic {

    @IsValidColorSemanticName()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsValidColorTokenName()
    light: string;

    @IsValidColorTokenName()
    dark: string;
}