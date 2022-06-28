require('dotenv').config();

import { FigmaUtil } from '../utils';

(async () => {
    try {
        await FigmaUtil.syncToJson();
    } catch (err) {
        console.error(err);
    }
})();