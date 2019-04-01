import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

const userManagementRoutes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: ':userId',
    component: UserDetailComponent
  }
];

const MatModules = [
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userManagementRoutes),
    MatModules
  ],
  declarations: [UserListComponent, UserDetailComponent]
})
export class UserManagementModule { }
