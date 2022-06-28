const cliProgress = require('cli-progress');
import { GenericBar } from 'cli-progress';

export class CliUtil {
    static makeProgressBar(total: number, start: number): GenericBar {
        const progress_bar = new cliProgress.SingleBar({
            format: '{bar}' + '| {percentage}%',
        }, cliProgress.Presets.shades_classic);
        progress_bar.start(total, start);
        return progress_bar;
    }
}