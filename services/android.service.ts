const fse = require('fs-extra');

import { EtaConfig } from 'eta/dist/types/config';
import { Path } from '../constants';
import { Env } from '../enums';
import { Service, TemplateDataInput } from '../interfaces';
import { EnvUtil, FileUtil } from '../utils';


export class AndroidService implements Service {

    constructor(
        private eta: EtaConfig,
        private data: TemplateDataInput) { }

    async output() {
        console.log('Start generate color files to Android project');

        // create sources and tests folder if not exists
        FileUtil.makeFolderRecursive('outputs/android/sources');
        FileUtil.makeFolderRecursive('outputs/android/tests');

        const generatedPalette = await this.eta.renderFile(Path.ANDROID_COLOR_PALETTE_TEMPLATE_PATH, this.data);
        const generatedColors = await this.eta.renderFile(Path.ANDROID_COLORS_TEMPLATE_PATH, this.data);

        FileUtil.writeToFile(generatedPalette, Path.ANDROID_COLOR_PALETTE_OUTPUT_PATH);
        FileUtil.writeToFile(generatedColors, Path.ANDROID_COLORS_OUTPUT_PATH);
    }

    override() {
        console.log('Start override color files to Android project');

        const android_root_folder_path = EnvUtil.safeGet(Env.Android_PROJECT_PATH);
        fse.copySync('outputs/android/sources', `${android_root_folder_path}/design-kit/src/main/java/com/xero/lite/designkit/theme`, { overwrite: true }, function (err: any) {
            if (err) {
                console.error(err);
            }
        })
    }

}