import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

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
    'userId',
    'username',
    'firstName',
    'lastName',
    'gender',
    'phone',
    'eMail',
    'isUserAdmin',
    'isLocked'
  ];

  constructor(
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.userManagementService.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
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

}
