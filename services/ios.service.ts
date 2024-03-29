const fse = require('fs-extra');

import { EtaConfig } from 'eta/dist/types/config';
import { Path } from '../constants';
import { Env } from '../enums';
import { IOSColorResource, Service, TemplateDataInput } from '../interfaces';
import { ColorSemantic } from '../models';
import { ColorUtil, EnvUtil, FileUtil, StringUtil } from '../utils';

export class IOSService implements Service {

    constructor(
        private eta: EtaConfig,
        private data: TemplateDataInput) { }

    async output() {
        console.log('Start generate color files for iOS project');

        // create sources and resources folder if not exists
        FileUtil.makeFolderRecursive('outputs/iOS/sources');
        FileUtil.makeFolderRecursive('outputs/iOS/resources');

        const color_rebrandings_extension = await this.eta.renderFile(Path.IOS_COLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH, this.data);
        const uicolor_rebrandings_extension = await this.eta.renderFile(Path.IOS_UICOLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH, this.data);
        const rebranding_colors = await this.eta.renderFile(Path.IOS_REBRANDING_COLORS_TEMPLATE_PATH, this.data);

        FileUtil.writeToFileSync(color_rebrandings_extension, Path.IOS_COLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH);
        FileUtil.writeToFileSync(uicolor_rebrandings_extension, Path.IOS_UICOLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH);
        FileUtil.writeToFileSync(rebranding_colors, Path.IOS_REBRANDING_COLORS_OUTPUT_PATH);

        await this.makeAssetsFolderContent(this.eta, this.data);
    }

    override() {
        console.log('Start override color files to iOS project');

        const iOS_root_folder_path = EnvUtil.safeGet(Env.IOS_PROJECT_PATH);

        fse.copySync('outputs/iOS/sources', `${iOS_root_folder_path}/modules/GoCommon/Sources/DesignKit/Colors`, { overwrite: true }, function (err: any) {
            if (err) {
                console.error(err);
            }
        });

        fse.copySync('outputs/iOS/resources/Color.xcassets', `${iOS_root_folder_path}/modules/GoCommon/Sources/DesignKit/Resources/Color.xcassets`, { overwrite: true }, function (err: any) {
            if (err) {
                console.error(err);
            }
        });
    }

    private makeAssetsFolder() {
        FileUtil.makeFolder(Path.IOS_REBRANDING_XCASSETS_PATH);
    }

    private async makeAssetsFolderContent(eta: EtaConfig, data: TemplateDataInput) {
        this.makeAssetsFolder();

        await FileUtil.copyFileToAsync(`templates/${Path.IOS_REBRANDING_XCASSETS_FOLDER_CONTENTS_JSON_TEMPLATE_PATH}`, Path.IOS_REBRANDING_XCASSETS_CONTENTS_JSON_PATH);
        data.semantic_colors.forEach((semantic_color: ColorSemantic) => {
            this.makeColorAsset(semantic_color.name.toLocaleLowerCase());

            const token_light = semantic_color.light;
            const token_dark = semantic_color.dark;

            this.makeColorContentsJson(eta, {
                light: ColorUtil.hexToRgbaObject(token_light),
                dark: ColorUtil.hexToRgbaObject(token_dark)
            }, semantic_color.name);
        });
    }

    private makeColorAsset(name: string) {
        FileUtil.makeFolder(`${Path.IOS_REBRANDING_XCASSETS_PATH}/${name}.colorset`);
    }

    private async makeColorContentsJson(eta: EtaConfig, color: IOSColorResource, name: string) {
        const color_contents_json = await eta.renderFile(Path.IOS_REBRANDING_XCASSETS_COLOR_CONTENTS_JSON_TEMPLATE_PATH, color);
        FileUtil.writeToFileSync(color_contents_json, `${Path.IOS_REBRANDING_XCASSETS_PATH}/${name}.colorset/Contents.json`);
    }
}