require('dotenv').config();
import { IOSService } from '../services';

(async () => {
    try {
        const iosService = new IOSService(null, null);
        iosService.override();
    } catch (err) {
        console.error(err);
    }
})();