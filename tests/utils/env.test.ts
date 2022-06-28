import { Env } from '../../enums';
import { EnvUtil } from '../../utils';

describe('EnvUtil', () => {

    describe('EnvUtil get undefined env variable', () => {

        beforeEach(() => {
            EnvUtil.set(Env.Team_Id, undefined);
        });

        test(`it should get undefined if env variable is not set yet`, () => {
            expect(EnvUtil.get(Env.Team_Id)).toBeUndefined();
        });
    });

    describe('EnvUtil get set method should work as expected', () => {

        let team_id: string;

        beforeEach(() => {
            team_id = '1000';
            EnvUtil.set(Env.Team_Id, team_id);
        });

        afterEach(() => {
            EnvUtil.set(Env.Team_Id, undefined);
        });

        test(`it should get the correct env value after successfull set`, () => {
            expect(EnvUtil.get(Env.Team_Id)).toBe(team_id);
        });
    });

    describe('EnvUtil safeGet method', () => {

        beforeEach(() => {
            EnvUtil.set(Env.Team_Id, undefined);
        });

        test(`it should throw error once the value is undefined`, () => {
            expect(() => { EnvUtil.safeGet(Env.Team_Id) }).toThrow(Error);
            expect(() => { EnvUtil.safeGet(Env.Team_Id) }).toThrow(`env variable ${Env.Team_Id} is not defined`);
        });
    });
});