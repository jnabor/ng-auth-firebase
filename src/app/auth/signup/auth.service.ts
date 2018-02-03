import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;
  userEmail: string;

  constructor(private router: Router) {

  }


  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {

  }

  passwordReset(email: string) {

  }

  getToken() {

  }

  isAuthenticated(): boolean {
    return false;
  }

  logout() {

  }
}
