import { registerDecorator, ValidationArguments } from 'class-validator';
import { ValidatorUtil } from '../../utils';

export function IsValidColorSemanticName() {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidColorSemanticName',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: "Invalid color semantic name",
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return ValidatorUtil.isValidColorSemanticName(value);
                },
            },
        });
    };
}