import { GenericBar, SingleBar } from 'cli-progress';
import { CliUtil } from '../../utils';

describe('CliUtil', () => {

    describe('CliUtil can be initialized correctly', () => {

        let start: number;
        let total: number;
        let progress_bar: GenericBar;

        beforeEach(() => {
            start = 0;
            total = 100;
            progress_bar = CliUtil.makeProgressBar(total, start);
        });

        afterEach(() => {
            progress_bar.stop();
        });

        test(`it should generate a correct cli-progress object once makeProgressBar is called`, () => {
            expect(progress_bar).not.toBeNull();
            expect(progress_bar instanceof SingleBar).toBeTruthy();
            expect(progress_bar.getTotal()).toEqual(total);
            expect(progress_bar.getProgress()).toEqual(start);
        });
    });

});