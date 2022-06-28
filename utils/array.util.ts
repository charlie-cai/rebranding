export class ArrayUtil {
    static flatmap(array: any[]): any[] {
        return array.reduce(function (accumulator, curValue) {
            return accumulator.concat(curValue)
        }, []);
    }
}