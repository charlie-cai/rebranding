require('dotenv').config();

const eta = require('eta');
const path = require('path');

import { IOSService } from '../services';
import { TemplateUtil } from '../utils';

(async () => {
    try {
        eta.configure({ views: path.join(__dirname, '../templates') });
        const data = await TemplateUtil.makeDataInputFromColorJson(true);
        
        const iosService = new IOSService(eta, data);
        iosService.output();
    } catch (err) {
        console.error(err);
    }
})();