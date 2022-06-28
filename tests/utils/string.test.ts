import { TestCase } from "../../interfaces";
import { StringUtil } from "../../utils";

describe("StringUtil", () => {

    describe("uppercaseFirstChar method", () => {

        let test_cases: TestCase<string, string>[];

        beforeEach(() => {
            test_cases = [
                { input: '', result: '' },
                { input: 'hello', result: 'Hello' },
                { input: 'HELLO', result: 'HELLO' },
                { input: 'hELLO', result: 'HELLO' }
            ]
        });

        test(`uppercaseFirstChar should work as expected`, () => {
            test_cases.forEach((test_case: TestCase<string, string>) => {
                expect(StringUtil.uppercaseFirstChar(test_case.input)).toBe(test_case.result);
            });
        });
    });

    describe("camelCaseFromHyphenCase method", () => {

        let test_cases: TestCase<string, string>[];

        beforeEach(() => {
            test_cases = [
                { input: '', result: '' },
                { input: 'hello', result: 'hello' },
                { input: 'hello-world', result: 'helloWorld' },
                { input: 'hello-World', result: 'helloWorld' },
                { input: 'hello-WOrld', result: 'helloWOrld' },
                { input: 'hello-nodejs-world', result: 'helloNodejsWorld' }
            ]
        });

        test(`camelCaseFromHyphenCase should work as expected`, () => {
            test_cases.forEach((test_case: TestCase<string, string>) => {
                expect(StringUtil.camelCaseFromHyphenCase(test_case.input)).toBe(test_case.result);
            });
        });
    });

});