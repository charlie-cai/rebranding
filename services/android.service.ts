const fse = require('fs-extra');

import { EtaConfig } from 'eta/dist/types/config';
import { Env } from '../enums';
import { Service, TemplateDataInput } from '../interfaces';
import { EnvUtil, FileUtil } from '../utils';

const ANDROID_COLOR_PALETTE_TEMPLATE_PATH = './android/GreenLiteRebrandingLiteColorPalette.eta';
const ANDROID_COLORS_TEMPLATE_PATH = './android/GreenLiteRebrandingLiteColors.eta';

const ANDROID_COLOR_PALETTE_OUTPUT_PATH = 'outputs/android/sources/GreenLiteRebrandingLiteColorPalette.kt';
const ANDROID_COLORS_OUTPUT_PATH = 'outputs/android/sources/GreenLiteRebrandingLiteColors.kt';

export class AndroidService implements Service {

    constructor(
        private eta: EtaConfig,
        private data: TemplateDataInput) { }

    async output() {
        console.log('Start generate color files to Android project');

        const generatedPalette = await this.eta.renderFile(ANDROID_COLOR_PALETTE_TEMPLATE_PATH, this.data);
        const generatedColors = await this.eta.renderFile(ANDROID_COLORS_TEMPLATE_PATH, this.data);

        FileUtil.writeToFile(generatedPalette, ANDROID_COLOR_PALETTE_OUTPUT_PATH);
        FileUtil.writeToFile(generatedColors, ANDROID_COLORS_OUTPUT_PATH);
    }

    override() {
        console.log('Start override color files to Android project');

        const android_root_folder_path = EnvUtil.safeGet(Env.Android_PROJECT_PATH);
        fse.copySync('outputs/android', `${android_root_folder_path}/design-kit/src/main/java/com/xero/lite/designkit/theme`, { overwrite: true }, function (err: any) {
            if (err) {
                console.error(err);
            }
        })
    }

}