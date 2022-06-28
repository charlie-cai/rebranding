
import { TestCase } from '../../interfaces';
import { ArrayUtil } from '../../utils';

describe('ArrayUtil', () => {

    describe('flatmap method', () => {

        let test_cases: TestCase<any[], any[]>[];

        beforeEach(() => {
            test_cases = [
                { input: [[1], [2], [3, 4], [5, 6, 7]], result: [1, 2, 3, 4, 5, 6, 7] },
                { input: [['1'], ['2'], ['3', '4'], ['5', '6', '7']], result: ['1', '2', '3', '4', '5', '6', '7'] },
            ]
        });

        test(`it should flat a nested array to a flat array`, () => {
            test_cases.forEach((test_case: TestCase<any[], any[]>) => {
                expect(ArrayUtil.flatmap(test_case.input)).toStrictEqual(test_case.result);
            });
        });
    });
});