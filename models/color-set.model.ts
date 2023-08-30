import { IsValidHexString } from './validator';
import { IsValidColorGroupName } from './validator/is-valid-color-group-name.validator';
import { IsValidColorSemanticName } from "./validator/is-valid-color-semantic-name.validator";

export class ColorSet {

    @IsValidColorGroupName()
    groupName?: string;

    @IsValidColorSemanticName()
    semanticName?: string;

    @IsValidHexString()
    lightHex?: string;

    @IsValidHexString()
    darkHex?: string;
}