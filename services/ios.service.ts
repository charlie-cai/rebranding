const fse = require('fs-extra');

import { EtaConfig } from 'eta/dist/types/config';
import { Env } from '../enums';
import { ColorSemantic, ColorToken, ColorTokenCategory, EtaData } from '../interfaces';
import { ColorUtil, EnvUtil, FileUtil } from '../utils';

const IOS_COLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH = 'iOS/Color+Rebrandings.eta';
const IOS_UICOLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH = 'iOS/UIColor+Rebrandings.eta';
const IOS_REBRANDING_COLORS_TEMPLATE_PATH = 'iOS/GreenLiteRebrandingLiteColors.eta';
const IOS_REBRANDING_XCASSETS_CONTENTS_JSON_TEMPLATE_PATH = 'iOS/Contents.eta';

const IOS_COLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH = 'outputs/iOS/Color+Rebrandings.swift';
const IOS_UICOLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH = 'outputs/iOS/UIColor+Rebrandings.swift';
const IOS_REBRANDING_COLORS_OUTPUT_PATH = 'outputs/iOS/GreenLiteRebrandingLiteColors.swift';

const IOS_REBRANDING_XCASSETS_PATH = 'outputs/iOS/Rebrandings.xcassets';
const IOS_REBRANDING_XCASSETS_CONTENTS_JSON_PATH = 'outputs/iOS/Rebrandings.xcassets/Contents.json';

export class IOSService {
    static async run(eta: EtaConfig, data: EtaData) {
        const color_rebrandings_extension = await eta.renderFile(IOS_COLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH, data);
        const uicolor_rebrandings_extension = await eta.renderFile(IOS_UICOLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH, data);
        const rebranding_colors = await eta.renderFile(IOS_REBRANDING_COLORS_TEMPLATE_PATH, data);

        FileUtil.writeToFile(color_rebrandings_extension, IOS_COLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH);
        FileUtil.writeToFile(uicolor_rebrandings_extension, IOS_UICOLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH);
        FileUtil.writeToFile(rebranding_colors, IOS_REBRANDING_COLORS_OUTPUT_PATH);

        await this.makeAssetsFolderContent(eta, data);

        console.log('Start override color files to iOS project');
        this.overrideFiles();
    }

    private static makeAssetsFolder() {
        FileUtil.makeFolder(IOS_REBRANDING_XCASSETS_PATH);
    }


    private static async makeAssetsFolderContent(eta: any, data: EtaData) {
        this.makeAssetsFolder();

        await FileUtil.copyFileTo(`templates/${IOS_REBRANDING_XCASSETS_CONTENTS_JSON_TEMPLATE_PATH}`, IOS_REBRANDING_XCASSETS_CONTENTS_JSON_PATH);
        data.rebranding.semantics.forEach((semantic: ColorSemantic) => {
            this.makeColorAsset(semantic.name);
            const token_light = data.rebranding.tokenCategories.find((tokenCategory: ColorTokenCategory) => tokenCategory.category == semantic.tokenCategoryLight)!.tokens.find((token: ColorToken) => token.token == semantic.tokenLight)!.color;
            const token_dark = data.rebranding.tokenCategories.find((tokenCategory: ColorTokenCategory) => tokenCategory.category == semantic.tokenCategoryDark)!.tokens.find((token: ColorToken) => token.token == semantic.tokenDark)!.color;

            const color = {
                light: ColorUtil.parseHexColor(token_light),
                dark: ColorUtil.parseHexColor(token_dark)
            }

            this.makeColorContentsJson(eta, color, semantic.name);
        });
    }

    private static makeColorAsset(name: string) {
        FileUtil.makeFolder(`${IOS_REBRANDING_XCASSETS_PATH}/${name}.colorset`);
    }

    private static async makeColorContentsJson(eta: any, color: any, name: string) {
        const color_contents_json = await eta.renderFile(IOS_REBRANDING_XCASSETS_CONTENTS_JSON_TEMPLATE_PATH, color);
        FileUtil.writeToFile(color_contents_json, `${IOS_REBRANDING_XCASSETS_PATH}/${name}.colorset/Contents.json`);
    }

    private static overrideFiles() {
        const iOS_root_folder_path = EnvUtil.get(Env.Ios_Color_Folder_Path);
        fse.copySync('outputs/iOS', iOS_root_folder_path, { overwrite: true }, function (err: any) {
            if (err) {
                console.error(err);
            }
        });
    }
}