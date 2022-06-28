import { TestCase } from '../../interfaces';
import { ValidatorUtil } from '../../utils';

describe('ValidatorUtil', () => {

    describe('isValidHex method', () => {
        let test_cases: TestCase<string, boolean>[];

        beforeEach(() => {
            test_cases = [
                { input: '123456', result: false },
                { input: '#123456', result: true },
                { input: '#123', result: false },
                { input: '#1234', result: false },
                { input: '#12345G', result: false },
                { input: '#ffffff', result: true },
                { input: '#FFFFF', result: false },
                { input: '#abcdef', result: true },
                { input: '#ABCDEF', result: true },
                { input: '#Transparent', result: true }
            ]
        });

        test(`it should return correct validation result`, () => {
            test_cases.forEach((test_case: TestCase<string, boolean>) => {
                expect(ValidatorUtil.isValidHex(test_case.input)).toEqual(test_case.result);
            });
        });
    });

    describe('isValidColorTokenName method', () => {
        let test_cases: TestCase<string, boolean>[];

        beforeEach(() => {
            test_cases = [
                { input: 'blue-02', result: true },
                { input: 'Blue-02', result: false },
                { input: 'blue-blue', result: false },
                { input: 'blue-02-02', result: false },
                { input: '02-blue', result: false },
                { input: 'transparent', result: true },
                { input: 'blue-02 ', result: false },
                { input: ' blue-02', result: false },
            ]
        });

        test(`it should return correct validation result`, () => {
            test_cases.forEach((test_case: TestCase<string, boolean>) => {
                expect(ValidatorUtil.isValidColorTokenName(test_case.input)).toEqual(test_case.result);
            });
        });
    });

    describe('isValidColorSemanticnName method', () => {
        let test_cases: TestCase<string, boolean>[];

        beforeEach(() => {
            test_cases = [
                { input: 'action-primary', result: true },
                { input: 'Action-primary', result: false },
                { input: 'action-secondary-go', result: true },
                { input: '02-blue', result: false },
                { input: 'action-primary ', result: false },
                { input: ' action-primary', result: false },
                { input: 'action- primary', result: false }
            ]
        });

        test(`it should return correct validation result`, () => {
            test_cases.forEach((test_case: TestCase<string, boolean>) => {
                expect(ValidatorUtil.isValidColorSemanticName(test_case.input)).toEqual(test_case.result);
            });
        });
    });

    describe('isValidColorGroupName method', () => {
        let test_cases: TestCase<string, boolean>[];

        beforeEach(() => {
            test_cases = [
                { input: 'action', result: true },
                { input: 'Action', result: false },
                { input: 'action0', result: false },
                { input: 'action ', result: false },
                { input: ' action', result: false }
            ]
        });

        test(`it should return correct validation result`, () => {
            test_cases.forEach((test_case: TestCase<string, boolean>) => {
                expect(ValidatorUtil.isValidColorGroupName(test_case.input)).toEqual(test_case.result);
            });
        });
    });
});