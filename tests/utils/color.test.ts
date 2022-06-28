
import { RgbaColor, TestCase } from '../../interfaces';
import { ColorUtil } from '../../utils';


describe('ColorUtil', () => {

    describe('hexToRgbObject method', () => {

        let test_cases: TestCase<string, RgbaColor>[];

        beforeEach(() => {
            test_cases = [
                {
                    input: '#FFFFFF',
                    result: { alpha: '0xFF', red: '0xFF', green: '0xFF', blue: '0xFF' }
                },
                {
                    input: '#ffffff',
                    result: { alpha: '0xFF', red: '0xff', green: '0xff', blue: '0xff' }
                },
                {
                    input: '#000000',
                    result: { alpha: '0xFF', red: '0x00', green: '0x00', blue: '0x00' }
                },
                {
                    input: '#Transparent',
                    result: { alpha: '0x00', red: '0x00', green: '0x00', blue: '0x00' }
                },
            ]
        });

        test(`it should convert # prefixed color string to correct rgb object`, () => {
            test_cases.forEach((test_case: TestCase<string, RgbaColor>) => {
                expect(ColorUtil.hexToRgbaObject(test_case.input)).toStrictEqual(test_case.result);
            });
        });

        test('it should throw error once the input is invalid hex color string', () => {
            expect(() => { ColorUtil.hexToRgbaObject('#123') }).toThrow(Error);
            expect(() => { ColorUtil.hexToRgbaObject('#123') }).toThrow('hexColorString is invalid');
        });
    });

    // describe('rgbToHex method', () => {

    //     let test_cases: TestCase<string, RgbColor>[];

    //     beforeEach(() => {
    //         test_cases = [
    //             {
    //                 input: '#FFFFFF',
    //                 result: { red: '0xFF', green: '0xFF', blue: '0xFF' }
    //             },
    //             {
    //                 input: '#ffffff',
    //                 result: { red: '0xff', green: '0xff', blue: '0xff' }
    //             },
    //             {
    //                 input: '#000000',
    //                 result: { red: '0x00', green: '0x00', blue: '0x00' }
    //             },
    //         ]
    //     });

    //     test(`it should generate correct # prefiexed hex color string based on red, green, blue input`, () => {
    //         test_cases.forEach((test_case: TestCase<string, RgbColor>) => {
    //             expect(ColorUtil.rgbToHex(test_case.input)).toStrictEqual(test_case.result);
    //         });
    //     });
    // });

    describe('sharpTo0xWithAlpha method', () => {

        let test_cases: TestCase<string, string>[];

        beforeEach(() => {
            test_cases = [
                { input: '#123456', result: '0xFF123456' },
                { input: '#FFFFFF', result: '0xFFFFFFFF' },
                { input: '#ffffff', result: '0xFFFFFFFF' },
                { input: '#000000', result: '0xFF000000' },
                { input: '#Transparent', result: '0x00000000' }
            ]
        });

        test(`it should convert # prefixed color string to correct 0x prefixed color string`, () => {
            test_cases.forEach((test_case: TestCase<string, string>) => {
                expect(ColorUtil.sharpTo0xWithAlpha(test_case.input)).toBe(test_case.result);
            });
        });

        test('it should throw error once the input is invalid hex color string', () => {
            expect(() => { ColorUtil.sharpTo0xWithAlpha('#123') }).toThrow(Error);
            expect(() => { ColorUtil.sharpTo0xWithAlpha('#123') }).toThrow('invalid # prefixed hex color string');
        });
    });
});