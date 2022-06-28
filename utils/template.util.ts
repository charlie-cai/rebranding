require('dotenv').config();

const eta = require('eta');
const path = require('path');

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TemplateDataInput } from '../interfaces';

import { ColorJson, ColorSemantic, ColorToken, ColorGroup } from './../models';
import { ColorUtil, FileUtil, StringUtil } from './../utils';

const COLOR_JSON = 'color.json';

export class TemplateUtil {
    static async makeDataInputFromColorJson(isIOS: boolean): Promise<TemplateDataInput> {
        eta.configure({ views: path.join(__dirname, '../templates') });

        const color_json = await FileUtil.readFileAsJson(COLOR_JSON);
        const color_json_object = plainToInstance(ColorJson, color_json);

        const errors = await validate(color_json_object);

        if (errors.length > 0) {
            throw new Error(JSON.stringify(errors));
        }

        let semantic_colors: ColorSemantic[] = [];
        color_json_object.groups.forEach((group: ColorGroup) => {
            semantic_colors = semantic_colors.concat(group.colors);
        })
        const token_colors: ColorToken[] = color_json_object.tokens;

        // on iOS we assign hex to semantic color directly
        // while on Android we assign token color to semantic color
        if (isIOS) {
            semantic_colors.map((semantic_color: ColorSemantic) => {
                semantic_color.light = token_colors.find((token_color: ColorToken) => token_color.name === semantic_color.light).hex;
                semantic_color.dark = token_colors.find((token_color: ColorToken) => token_color.name === semantic_color.dark).hex;
            });
        }
        const func = {
            camelCaseFromHyphenCase: StringUtil.camelCaseFromHyphenCase,
            uppercaseFirstChar: StringUtil.uppercaseFirstChar,
            sharpTo0xWithAlpha: ColorUtil.sharpTo0xWithAlpha
        }

        return { semantic_colors, token_colors, func };
    }
}