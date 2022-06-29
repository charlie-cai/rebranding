import { Env } from '../../enums';
import { EnvUtil } from '../../utils';

describe('EnvUtil', () => {

    describe('EnvUtil get undefined env variable', () => {

        beforeEach(() => {
            EnvUtil.set(Env.Figma_Token, undefined);
        });

        test(`it should get undefined if env variable is not set yet`, () => {
            expect(EnvUtil.get(Env.Figma_Token)).toBeUndefined();
        });
    });

    describe('EnvUtil get set method should work as expected', () => {

        let token: string;

        beforeEach(() => {
            token = '1000';
            EnvUtil.set(Env.Figma_Token, token);
        });

        afterEach(() => {
            EnvUtil.set(Env.Figma_Token, undefined);
        });

        test(`it should get the correct env value after successfull set`, () => {
            expect(EnvUtil.get(Env.Figma_Token)).toBe(token);
        });
    });

    describe('EnvUtil safeGet method', () => {

        beforeEach(() => {
            EnvUtil.set(Env.Figma_Token, undefined);
        });

        test(`it should throw error once the value is undefined`, () => {
            expect(() => { EnvUtil.safeGet(Env.Figma_Token) }).toThrow(Error);
            expect(() => { EnvUtil.safeGet(Env.Figma_Token) }).toThrow(`env variable ${Env.Figma_Token} is not defined`);
        });
    });
});