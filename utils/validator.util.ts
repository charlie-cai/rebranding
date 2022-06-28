export class ValidatorUtil {

    static isValidHex(hex: string): boolean {
        if (hex == '#Transparent') {
            return true;
        }
        const regex = new RegExp(/^#([0-9a-f]{6})$/i);
        return regex.test(hex);
    }

    static isValidColorTokenName(name: string): boolean {
        if (name == 'transparent') {
            return true;
        }

        const isNoSpace = !name.includes(' ');
        const isOnlyOneHyphen = (name.match(/-/g) || []).length === 1;
        const isAllLowercase = name === name.toLowerCase();
        const isFirstPartAllLetters = this.isAllLetter(name.split('-')[0]);
        const isFirstPartAllNumbers = this.isALlNumber(name.split('-')[1]);
        return isNoSpace && isOnlyOneHyphen && isAllLowercase && isFirstPartAllLetters && isFirstPartAllNumbers;
    }

    static isValidColorSemanticName(name: string): boolean {
        const isNoSpace = !name.includes(' ');
        const isAtLeastOneHyphen = (name.match(/-/g) || []).length >= 1;
        const isAllLowercase = name === name.toLowerCase();
        const isFirstPartAllLetters = this.isAllLetter(name.split('-')[0]);
        return isNoSpace && isAtLeastOneHyphen && isAllLowercase && isFirstPartAllLetters;
    }

    static isValidColorGroupName(name: string): boolean {
        const isNoSpace = !name.includes(' ');
        const isNotContainHyphen = (name.match(/-/g) || []).length <= 0;
        const isAllLowercase = name === name.toLowerCase();
        const isAllLetters = this.isAllLetter(name);
        return isNoSpace && isNotContainHyphen && isAllLowercase && isAllLetters;
    }

    private static isAllLetter(text: string): boolean {
        return /^[a-z]+$/.test(text);
    }

    private static isALlNumber(text: string) {
        return /^[0-9]+$/.test(text);
    }

}