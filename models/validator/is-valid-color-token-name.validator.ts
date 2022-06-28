import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidatorUtil } from '../../utils';

export function IsValidColorTokenName() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidColorTokenName',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: "Invalid color token name",
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return ValidatorUtil.isValidColorTokenName(value);
                },
            },
        });
    };
}