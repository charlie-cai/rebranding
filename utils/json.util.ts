export class JSONUtil {
    static prettify(object: any): string {
        return JSON.stringify(object, null, 2);
    }
}