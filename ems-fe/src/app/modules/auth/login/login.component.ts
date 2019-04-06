import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ConfigsService } from 'src/app/configs/configs.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'ems-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userNameFc = new FormControl('', [Validators.required]);
  passwordFc = new FormControl('', [Validators.required]);
  returnUrl: string;
  loading = false;

  constructor(
    private authService: AuthService,
    private configsService: ConfigsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configsService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        sidebar: {
          hidden: true
        },
      }
    };
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    if (this.userNameFc.invalid || this.passwordFc.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.userNameFc.value, this.passwordFc.value, this.returnUrl)
      .pipe(first())
      .subscribe(
        data => {
          this.userNameFc.reset();
          this.passwordFc.reset();
          this.router.navigate(['/user']);
        },
        error => {
          if (error.error.code !== undefined &&
            error.error.message !== undefined &&
            error.error.code === 'OP_EXCEPTION') {
            this.openSnackBar(error.error.message);
          } else {
            this.openSnackBar('Incorrect email or password');
          }
          this.loading = false;
        }
      );
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
