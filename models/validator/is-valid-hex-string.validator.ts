import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidatorUtil } from '../../utils';

export function IsValidHexString() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidHexString',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: "Invalid hex color string",
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return ValidatorUtil.isValidHex(value);
                },
            },
        });
    };
}