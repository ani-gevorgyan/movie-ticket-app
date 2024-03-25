import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchValidation,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchValidation implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  validate(value: never, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const [relatedPropertyName] = validationArguments.constraints;
    return `${validationArguments?.property} must match ${relatedPropertyName} exactly`;
  }
}
