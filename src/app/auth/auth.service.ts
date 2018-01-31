import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  token: string;
  userEmail: string;

  constructor(private router: Router) {

  }


  signupUser(email: string, password: string) {

  }

  signinUser(email: string, password: string) {

  }

  getToken() {

  }

  isAuthenticated(): boolean {
    return false;
  }

  logout(){

  }
}
