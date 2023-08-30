require('dotenv').config();

import { FigmaUtil } from '../utils';

(async () => {
    try {
        await FigmaUtil.output();
    } catch (err) {
        console.error(err);
    }
})();