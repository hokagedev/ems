import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'ems-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.auth$.subscribe(data => {
      this.isAuthenticated = data;
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
