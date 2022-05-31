export class ColorUtil {

    static parseHexColor(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            alpha: parseInt(result[1], 16) / 255,
            red: parseInt(result[2], 16) / 255,
            green: parseInt(result[3], 16) / 255,
            blue: parseInt(result[4], 16) / 255
        } : null;
    }

    static rgbaToHex(red: number, green: number, blue: number, alpha: number) {
        const componentToHex = (c: number) => {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }
        return ('#' + componentToHex(alpha) + componentToHex(red) + componentToHex(green) + componentToHex(blue)).toUpperCase();
    }

    static sharpTo0x(color: string): string {
        return '0x' + color.slice(1);
    }
}