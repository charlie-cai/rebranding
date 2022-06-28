require('dotenv').config();
import { AndroidService } from '../services';

(async () => {
    try {
        const androidService = new AndroidService(null, null);
        androidService.override();
    } catch (err) {
        console.error(err);
    }
})();