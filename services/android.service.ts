const fse = require('fs-extra');

import { EtaConfig } from 'eta/dist/types/config';
import { Env } from '../enums';
import { EtaData } from '../interfaces';
import { EnvUtil, FileUtil } from '../utils';

const ANDROID_COLOR_PALETTE_TEMPLATE_PATH = './android/GreenLiteRebrandingLiteColorPalette.eta';
const ANDROID_COLORS_TEMPLATE_PATH = './android/GreenLiteRebrandingLiteColors.eta';

const ANDROID_COLOR_PALETTE_OUTPUT_PATH = 'outputs/android/GreenLiteRebrandingLiteColorPalette.kt';
const ANDROID_COLORS_OUTPUT_PATH = 'outputs/android/GreenLiteRebrandingLiteColors.kt';

export class AndroidService {
    static async run(eta: EtaConfig, data: EtaData) {

        const generatedPalette = await eta.renderFile(ANDROID_COLOR_PALETTE_TEMPLATE_PATH, data);
        const generatedColors = await eta.renderFile(ANDROID_COLORS_TEMPLATE_PATH, data);

        FileUtil.writeToFile(generatedPalette, ANDROID_COLOR_PALETTE_OUTPUT_PATH);
        FileUtil.writeToFile(generatedColors, ANDROID_COLORS_OUTPUT_PATH);

        console.log('Start override color files to Android project');
        this.overrideFiles()
    }

    private static overrideFiles() {
        const android_root_folder_path = EnvUtil.get(Env.Android_Color_Folder_Path);
        fse.copySync('outputs/android', android_root_folder_path, { overwrite: true }, function (err: any) {
            if (err) {
                console.error(err);
            }
        });
    }
}