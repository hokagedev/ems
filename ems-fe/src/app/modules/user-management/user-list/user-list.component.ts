import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { EmsUser } from '../../auth/models/user.model';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'ems-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<EmsUser>;
  displayedColumns = [
    'username',
    'firstName',
    'lastName',
    'gender',
    'phone',
    'email',
    'role',
    'isLocked'
  ];

  constructor(
    private userManagementService: UserManagementService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userManagementService.getUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data['users']);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(row) {
    this.router.navigate(['user', row.userId]);
  }
}
