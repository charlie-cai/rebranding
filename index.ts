require('dotenv').config();
const eta = require('eta');
const path = require('path');

import { AndroidService, FigmaService, IOSService } from './services';
import { ColorUtil, FileUtil, StringUtil } from './utils';

const COLOR_JSON = 'color.json';

(async () => {
    try {
        console.log('Start sync figma file to color.json');
        // await FigmaService.syncToJson();

        eta.configure({
            views: path.join(__dirname, "templates")
        })

        const color_json = await FileUtil.readFileAsJson(COLOR_JSON);
        let colors: any = [];
        color_json.groups.forEach((group: any) => {
            colors = colors.concat(group.colors);
        })
        const func = {
            camelCaseFromHyphenCase: StringUtil.camelCaseFromHyphenCase,
            uppercaseFirstChar: StringUtil.uppercaseFirstChar,
            sharpTo0x: ColorUtil.sharpTo0x
        }

        const data = { colors, func };

        console.log('Start generate colors files for iOS');
        IOSService.run(eta, data);

        // console.log('Start generate colors files for android');
        // AndroidService.run(eta, data);
    } catch (e) {
        console.error(e);
    }

})();