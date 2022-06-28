import "reflect-metadata";
import { IsValidHexString, IsValidColorTokenName } from './validator';

export class ColorToken {

    @IsValidColorTokenName()
    name: string;

    @IsValidHexString()
    hex: string;
}