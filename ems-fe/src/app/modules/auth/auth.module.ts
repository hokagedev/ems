import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

const authRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
];

const MatModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatModules
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
