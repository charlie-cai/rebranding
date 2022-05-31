export class StringUtil {

    static uppercaseFirstChar(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    static camelCaseFromHyphenCase(text: string): string {

        const seperator = '-';
        const words = text.split(seperator);
        const first_word = words[0].toLowerCase();
        words.shift();

        const result = words.reduce(
            (previousValue, currentValue) => {
                const uppercaseFirstChar = this.uppercaseFirstChar(currentValue);
                return previousValue + uppercaseFirstChar;
            }, first_word
        );

        return result;
    }
}