
import { Env } from '../enums';

export class EnvUtil {

    static safeGet(env: Env): string {
        const value = process.env[env];
        if (value === undefined) {
            throw new Error(`env variable ${env} is not defined`);
        } else {
            return value;
        }
    }

    static safeSet(env: Env, value: string): void {
        process.env[env] = value;
    }

    static get(env: Env): string | undefined {
        return process.env[env];
    }

    static set(env: Env, value: string | undefined): void {
        if (typeof value === 'undefined') {
            delete process.env[env];
        } else {
            process.env[env] = value;
        }
    }
}