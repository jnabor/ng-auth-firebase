import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router ) {
}

  ngOnInit() {
  }

  isAuthenticated(): boolean {
    return false;
  }

  getUrl() {
    return this.router.url;
  }
}
