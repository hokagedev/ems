import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'ems-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNameFc = new FormControl('', [Validators.required]);
  passwordFc = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.userNameFc.invalid || this.passwordFc.invalid) {
      return;
    }
    if (this.authService.login(this.userNameFc.value, this.passwordFc.value) != null) {
      this.router.navigateByUrl('home');
    } else {
      this.snackBar.open(
        'Username or password is invalid!',
        '',
        {
          duration: 3500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: 'warningSnackBar'
        }
      );
    }
  }

}
