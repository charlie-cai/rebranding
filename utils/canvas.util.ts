import * as fs from "fs";
import { createCanvas } from "canvas";
import { ColorGroup, ColorJson, ColorSemantic, ColorSet, ColorToken } from "../models";

const COLOR_RECT_WIDTH = 300;
const COLOR_RECT_HEIGHT = 150;
const TEXT_X_OFFSET = 20;
const TEXT_Y_OFFSET = 0.5 * COLOR_RECT_HEIGHT;
const OUTPUT_FILE_NAME = 'snapshot.png';

export class CanvasUtil {

    static makeImage(colorJson: ColorJson) {

        // Generate flattened color set array
        const colorSets: ColorSet[] = [];
        colorJson.groups.forEach((group: ColorGroup) => {
            colorSets.push({ groupName: group.name })
            group.colors.forEach((color: ColorSemantic) => {
                const lightHex = colorJson.tokens.find((colorToken: ColorToken) => colorToken.name == color.light).hex;
                const darkHex = colorJson.tokens.find((colorToken: ColorToken) => colorToken.name == color.dark).hex;

                colorSets.push({
                    semanticName: color.name,
                    lightHex: lightHex,
                    darkHex: darkHex
                })
            });
        });

        // Make Canvas
        const canvas = createCanvas(COLOR_RECT_WIDTH * 2, colorSets.length * COLOR_RECT_HEIGHT);
        const ctx = canvas.getContext("2d");

        // Draw Core codes
        colorSets.forEach((colorSet: ColorSet, index: number) => {
            if (colorSet.groupName != null) {
                CanvasUtil.drawRect(ctx, 0, COLOR_RECT_HEIGHT * index, COLOR_RECT_WIDTH * 2, COLOR_RECT_HEIGHT, colorSet.groupName, '#FFFFFF');
            } else {
                CanvasUtil.drawRect(ctx, 0, COLOR_RECT_HEIGHT * index, COLOR_RECT_WIDTH, COLOR_RECT_HEIGHT, colorSet.semanticName, colorSet.lightHex);
                CanvasUtil.drawRect(ctx, COLOR_RECT_WIDTH, COLOR_RECT_HEIGHT * index, COLOR_RECT_WIDTH, COLOR_RECT_HEIGHT, colorSet.semanticName, colorSet.darkHex);
            }
        });

        // Output image file
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(OUTPUT_FILE_NAME, buffer);
    }

    private static drawRect(
        ctx: any,
        x: number, y: number,
        width: number, height: number,
        text: string, fillColorHex: string) {
        if (fillColorHex !== '#Transparent') {
            ctx.fillStyle = fillColorHex;
            ctx.fillRect(x, y, width, height);
        }
        ctx.font = "21px Helvetica Neue";
        ctx.fillStyle = '#000000';
        ctx.fillText(text, x + TEXT_X_OFFSET, y + TEXT_Y_OFFSET);
    }
}