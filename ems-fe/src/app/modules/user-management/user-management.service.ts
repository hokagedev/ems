import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { EmsUser } from '../auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  constructor() { }

  public getUsers() {
    const users: EmsUser[] = [];
    for (let i = 1; i < 50; i++) {
      users.push({
        userId: i,
        username: 'user' + i,
        password: '1',
        firstName: 'Ems' + i,
        lastName: 'User' + i,
        gender: i % 5 === 0 ? 1 : 0,
        phone: '09896789' + i,
        eMail: 'user-' + i + '@gmail.com',
        isUserAdmin: false,
        isLocked: i === 5 ? true : false
      });
    }
    return of(users);
  }
}
