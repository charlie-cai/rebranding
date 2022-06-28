import { TestCase } from '../../interfaces';
import { JSONUtil } from '../../utils';

describe('JSONUtil', () => {

    describe('prettify method', () => {

        let test_cases: TestCase<any, string>[];

        beforeEach(() => {
            test_cases = [
                {
                    input: {
                        id: 'ID',
                        shape: 'rectangle'
                    },
                    result: '{\n  "id": "ID",\n  "shape": "rectangle"\n}'
                },
                {
                    input: {
                        hello: 'WORLD',
                        NICE: 'weather'
                    },
                    result: '{\n  "hello": "WORLD",\n  "NICE": "weather"\n}'
                }
            ]
        });

        test('it should get correct prettified string once encode object with JSONUtil.prettify method', () => {
            test_cases.forEach((test_case: TestCase<any, string>) => {
                expect(JSONUtil.prettify(test_case.input)).toBe(test_case.result);
            });
        });
    });
});