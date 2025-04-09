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
    }TypeScript decorators are a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration
}
