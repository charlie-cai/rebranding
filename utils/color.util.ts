import { RgbaColor } from "../interfaces";
import { ValidatorUtil } from "./validator.util";

export class ColorUtil {

    static hexToRgbaObject(hex: string): RgbaColor {

        if (!ValidatorUtil.isValidHex(hex)) {
            throw new Error('hexColorString is invalid');
        }

        if (hex === '#Transparent') {
            return {
                alpha: '0x00',
                red: '0x00',
                green: '0x00',
                blue: '0x00'
            }
        }

        return {
            alpha: '0xFF',
            red: `0x${hex.substring(1, 3)}`,
            green: `0x${hex.substring(3, 5)}`,
            blue: `0x${hex.substring(5, 7)}`
        }
    }

    // static rgbToHex(red: number, green: number, blue: number): string {
    //     const componentToHex = (c: number) => {
    //         var hex = c.toString(16);
    //         return hex.length == 1 ? "0" + hex : hex;
    //     }
    //     return ('#' + componentToHex(red) + componentToHex(green) + componentToHex(blue)).toUpperCase();
    // }

    static sharpTo0xWithAlpha(hex: string): string {
        if (!ValidatorUtil.isValidHex(hex)) {
            throw new Error('invalid # prefixed hex color string');
        }

        if (hex === '#Transparent') {
            return '0x00000000';
        }

        return '0x' + `FF${hex.slice(1)}`.toUpperCase();
    }
}