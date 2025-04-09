import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function Match<T>(
    property: keyof T,
    validationOptions?: ValidationOptions,
) {
    return (object: T, propertyName: string) => {
        registerDecorator({
            name: 'Match',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: unknown, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as T)[relatedPropertyName];
                    return typeof value === typeof relatedValue && value === relatedValue;
                },
                defaultMessage(args: any) {
                    return `${args.property} must match ${args.constraints[0]}`;
                },
            },
        })
    }
}
