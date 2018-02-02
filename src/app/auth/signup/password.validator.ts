import {FormControl} from '@angular/forms';


export interface PasswordValidatorOptions {
  requireLetters?: boolean;
  requireLowerCaseLetters?: boolean;
  requireUpperCaseLetters?: boolean;
  requireNumbers?: boolean;
  requireSpecialCharacters?: boolean;
}


export function passwordValidator (options: PasswordValidatorOptions) {

  const validator = new PasswordValidator(options);

  return function validatePassword (control: FormControl) {
    return validator.validate(control.value);
  };
}

export function passwordValidatorLength (min: number, max: number) {

  const validator = new PasswordValidatorLength(min, max);

  return function validatePassword (control: FormControl) {
    return validator.validate(control.value);
  };
}

export class PasswordValidatorLength {

  constructor (private min: number, private max: number) {
  }

  validate (value: string): any {

    if (!value) {
      return null;
    }

    const errors: any = {};

    // Minimum length.
    if (this.min > 0 && value.length < this.min) {
      errors.passwordMinLengthRequired = {
        minLength: this.min
      };
    }

    // Maximum length.
    if (this.max >= 0 && value.length > this.max) {
      errors.passwordMaxLengthExceeded = {
        maxLength: this.max
      };
    }
    return Object.keys(errors).length > 0 ? errors : null;
  }
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

    // Letters.
    if (this.options.requireLetters && !this.letterMatcher.test(value)) {
      errors.passwordLetterRequired = true;
    }

    // Lower-case letters.
    if (this.options.requireLowerCaseLetters && !this.lowerCaseLetterMatcher.test(value)) {
      errors.passwordLowerCaseLetterRequired = true;
    }

    // Upper-case letters.
    if (this.options.requireUpperCaseLetters  && !this.upperCaseLetterMatcher.test(value)) {
      errors.passwordUpperCaseLetterRequired = true;
    }

    // Numbers.
    if (this.options.requireNumbers && !this.numberMatcher.test(value)) {
      errors.passwordNumberRequired = true;
    }

    // Special characters.
    if (this.options.requireSpecialCharacters && !this.specialCharactersMatcher.test(value)) {
      errors.passwordSpecialCharacterRequired = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;

  }

}
