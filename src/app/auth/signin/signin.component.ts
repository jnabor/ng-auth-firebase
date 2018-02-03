import { Component, OnInit, DoCheck } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  intervalQuery: any;
  intervalTimeout: any;
  showSignInFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

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
    this.intervalQuery = setInterval(() => {
      this.checkAuthenticationStatus();
      }, 50);
    this.intervalTimeout = setInterval(() => {
        this.checkTimeoutStatus();
        }, 5000);
  }

  checkAuthenticationStatus () {
    if (this.authService.signInStatus() === 'signedin') {
      console.log('signed in');
      this.toggleProgress = false;
      this.clearIntervals();
      this.router.navigate(['/home']);

    } else if (this.authService.signInStatus() === 'invalidsignin') {
      this.showSignInFailed = true;
      console.log('invalid email or password');
      this.toggleProgress = false;
      this.clearIntervals();
      this.showSignInFailed = true;
      setTimeout(() => {
        this.showSignInFailed = false;
      }, 5000);

    } else {
      console.log('waiting');
    }
  }

  clearIntervals () {
    if (this.intervalQuery) {
      clearInterval(this.intervalQuery);
    }
    if (this.intervalTimeout) {
      clearInterval(this.intervalTimeout);
    }
  }

  checkTimeoutStatus () {
    this.clearIntervals();
    console.log('sign in timeout');

  }
}
