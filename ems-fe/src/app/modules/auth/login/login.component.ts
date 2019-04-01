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
    const user = this.authService.login(this.userNameFc.value, this.passwordFc.value);
    if (user == null) {
      this.openSnackBar('Username or password is invalid!');
      return;
    }
    if ( user != null && user.isLocked) {
      this.openSnackBar('Account is blocked!');
      return;
    }
    user.isUserAdmin ? this.router.navigateByUrl('user') : this.router.navigateByUrl('home');

  }

  openSnackBar(message) {
    this.snackBar.open(
      message,
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
