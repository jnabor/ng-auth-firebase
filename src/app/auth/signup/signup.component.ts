import { Component, OnInit, DoCheck } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { matchOtherValidator } from './match-other-validator';

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
  hide = true;

  userEmail: string;
  userPassword: string;
  confirmPassword: string;

  emailPattern   = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailFormControl = new FormControl('', [ Validators.required, Validators.pattern(this.emailPattern)]);
  passwordFormControl = new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20) ]);
  confirmFormControl = new FormControl('', [ Validators.required, , matchOtherValidator('passwordFormControl') ]);

  matcherEmail = new MyErrorStateMatcher();
  matcherPassword = new MyErrorStateMatcher();
  matcherPasswordConfirm = new MyErrorStateMatcher();

  constructor() { }

  ngOnInit() {
  }

  ngDoCheck() {

    if (this.submitted === false) {
      if (this.emailFormControl.hasError('pattern') ||
          this.emailFormControl.hasError('required') ||
          this.passwordFormControl.hasError('required') ||
          this.confirmFormControl.hasError('required')) {
        this.submitDisabled = true;
      } else {
        this.submitDisabled = false;
      }
    }
  }

  onSignUp() {
    this.toggleProgress = true;
    this.submitted = true;
    console.log(this.userEmail);
    console.log(this.userPassword);
    console.log(this.confirmPassword);
  }
}
