import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidatorUtil } from '../../utils';

export function IsValidColorGroupName() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidColorGroupName',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: "Invalid color group name",
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return ValidatorUtil.isValidColorGroupName(value);
                },
            },
        });
    };
}
