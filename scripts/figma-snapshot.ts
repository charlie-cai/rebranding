require('dotenv').config();

import { FigmaUtil } from '../utils';

(async () => {
    try {
        await FigmaUtil.snapshot();
    } catch (err) {
        console.error(err);
    }
})();