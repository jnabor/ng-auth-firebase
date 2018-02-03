import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;
  signIn = '';
  registered = false;

  constructor(private router: Router) {

  }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.registered = true;
        }
      )
      .catch(
        error => {
          console.log(error);
          this.registered = false;
        }
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(response);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                this.signIn = 'signedin';
              }
            )
            .catch(
              error => {
                console.log('cannot get token');
                this.signIn = 'invalidsignin';
              }
            );
        }
      )
      .catch(
        error => {
          console.log('invalidsignin');
          this.signIn = 'invalidsignin';
        }
      );
  }

  passwordReset(email: string) {

  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
      return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  signInStatus(): string {
    return this.signIn;
  }

  isRegistered(): boolean {
    return this.registered;
  }

  logout() {
    this.signIn = '';
    this.token = null;
  }
}
