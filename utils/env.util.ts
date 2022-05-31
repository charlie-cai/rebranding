
import { Env } from '../enums';

export class EnvUtil {
    static get(env: Env): string | undefined {
        return process.env[env];
    }
}