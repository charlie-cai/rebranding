require('dotenv').config();

const eta = require('eta');
const path = require('path');

import { AndroidService } from '../services';
import { TemplateUtil } from '../utils';

(async () => {
    try {
        eta.configure({ views: path.join(__dirname, 'templates') });
        const data = await TemplateUtil.makeDataInputFromColorJson(false);
        const androidService = new AndroidService(eta, data);

        androidService.output();

    } catch (err) {
        console.error(err);
    }

})();