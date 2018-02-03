import { FormControl, ValidatorFn, AbstractControl} from '@angular/forms';

export interface PasswordValidatorOptions {
  minLength?: number;
  maxLength?: number;
  requireLetters?: boolean;
  requireLowerCaseLetters?: boolean;
  requireUpperCaseLetters?: boolean;
  requireNumbers?: boolean;
  requireSpecialCharacters?: boolean;
}

export function passwordFormatValidator(options: PasswordValidatorOptions): ValidatorFn {

  const validator = new PasswordValidator(options);

  return (control: AbstractControl): {[key: string]: any} => {
    return validator.validate(control.value);
  };
}

export class PasswordValidator {

  private letterMatcher = /[a-zA-Z]/;
  private lowerCaseLetterMatcher = /[a-z]/;
  private upperCaseLetterMatcher = /[A-Z]/;
  private numberMatcher = /[0-9]/;
  private specialCharactersMatcher = /[-+=_.,:;~`!@#$%^&*(){}<>\[\]"'\/\\]/;

  constructor (private options: PasswordValidatorOptions) {
  }

  validate (value: string): any {
    if (!value) {
      return null;
    }

    const errors: any = {};

    if (this.options.minLength > 0 && value.length < this.options.minLength) {
      errors.passwordMinLengthRequired = {
        minLength: this.options.minLength
      };
    }

    if (this.options.maxLength >= 0 && value.length > this.options.maxLength) {
      errors.passwordMaxLengthExceeded = {
        maxLength: this.options.maxLength
      };
    }

    if (this.options.requireLetters && !this.letterMatcher.test(value)) {
      errors.passwordLetterRequired = true;
    }

    if (this.options.requireLowerCaseLetters && !this.lowerCaseLetterMatcher.test(value)) {
      errors.passwordLowerCaseLetterRequired = true;
    }

    if (this.options.requireUpperCaseLetters  && !this.upperCaseLetterMatcher.test(value)) {
      errors.passwordUpperCaseLetterRequired = true;
    }

    if (this.options.requireNumbers && !this.numberMatcher.test(value)) {
      errors.passwordNumberRequired = true;
    }

    if (this.options.requireSpecialCharacters && !this.specialCharactersMatcher.test(value)) {
      errors.passwordSpecialCharacterRequired = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }
}
