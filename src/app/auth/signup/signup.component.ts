import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { matchOtherValidator } from './match-other-validator';
import { PasswordValidatorOptions, passwordFormatValidator } from './password.validator';
import { AuthService } from '../auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, DoCheck {
  toggleProgress = false;
  submitDisabled  = true;
  submitted = false;
  pwhide = true;
  cnhide = true;

  userEmail: string;
  userPassword: string;
  confirmPassword: string;

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  passwordRequirements: PasswordValidatorOptions = {
    minLength: 8,
    maxLength: 20,
    requireLetters: true,
    requireLowerCaseLetters: true,
    requireUpperCaseLetters: true,
    requireNumbers: true,
    requireSpecialCharacters: true
  };

  signinForm: FormGroup;

  matcherEmail = new MyErrorStateMatcher();
  matcherPassword = new MyErrorStateMatcher();
  matcherPasswordConfirm = new MyErrorStateMatcher();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [ Validators.required, Validators.pattern(this.emailPattern)]),
      password: new FormControl('', [ Validators.required,
                                      passwordFormatValidator(this.passwordRequirements)]),
      confirmPassword: new FormControl('', [ Validators.required, , matchOtherValidator('password') ]),
      submit: new FormControl({enabled: false})
    });
  }

  updateForm() {

  }

  ngDoCheck() {
    if (this.submitted === false) {
      if ((this.signinForm.get('email').valid) &&
          (this.signinForm.get('password').valid) &&
          (this.signinForm.get('confirmPassword').valid)) {
        this.submitDisabled = false;
      } else {
        this.submitDisabled = true;
      }
    }

  }

  onSignUp() {
    this.toggleProgress = true;
    this.submitted = true;
    this.authService.signupUser(this.userEmail, this.userPassword);
  }


  emailRequired() {
    return this.signinForm.get('email').hasError('required');
  }

  emailPatternInvalid() {
    return this.signinForm.get('email').hasError('pattern');
  }

  passwordRequired() {
    return this.signinForm.get('password').hasError('required');
  }

  passwordInvalid() {
    return !this.signinForm.get('password').hasError('passwordFormatValidator');
  }

  confirmPasswordRequired() {
    return this.signinForm.get('confirmPassword').hasError('required');
  }

  confirmPasswordMismatch() {
    return !this.signinForm.get('confirmPassword').hasError('matchOtherValidator');
  }
}
