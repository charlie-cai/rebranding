require('dotenv').config();
const eta = require('eta');
const path = require('path');

import { AndroidService, FigmaService, IOSService } from './services';
import { ColorUtil, FileUtil, StringUtil } from './utils';

const REBRANDING_JSON = 'rebranding.json';

(async () => {
    try {
        console.log('Start sync figma file to rebranding.json');
        await FigmaService.syncToJson();

        eta.configure({
            views: path.join(__dirname, "templates")
        })

        const rebranding = await FileUtil.readFileAsJson(REBRANDING_JSON);
        const func = {
            camelCaseFromHyphenCase: StringUtil.camelCaseFromHyphenCase,
            uppercaseFirstChar: StringUtil.uppercaseFirstChar,
            sharpTo0x: ColorUtil.sharpTo0x
        }

        const data = { rebranding, func };

        console.log('Start generate colors files for iOS');
        IOSService.run(eta, data);

        console.log('Start generate colors files for android');
        AndroidService.run(eta, data);
    } catch (e) {
        console.error(e);
    }

})();