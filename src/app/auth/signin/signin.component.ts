import { Component, OnInit, DoCheck } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit, DoCheck {
  toggleProgress = false;
  submitDisabled  = true;
  submitted = false;
  hide = true;

  emailPattern   = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  emailFormControl = new FormControl('', [ Validators.required, Validators.pattern(this.emailPattern)]);
  passwordFormControl = new FormControl('', [ Validators.required ]);

  matcherEmail = new MyErrorStateMatcher();
  matcherPassword = new MyErrorStateMatcher();

  userEmail: string;
  userPassword: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.submitted === false) {
      if (this.emailFormControl.hasError('pattern') ||
         this.emailFormControl.hasError('required') ||
         this.passwordFormControl.hasError('required')) {
        this.submitDisabled = true;
      } else {
        this.submitDisabled = false;
      }
    }
  }

  onSignIn() {
    this.toggleProgress = true;
    this.submitted = true;
    this.authService.signinUser(this.userEmail, this.userPassword);
  }
}
