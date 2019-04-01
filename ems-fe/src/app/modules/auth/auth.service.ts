import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userName, password) {
    if (userName === 'giangtm' && password === '1') {
      return {
        userName: 'giangtm',
        firtName: 'Tong',
        lastName: 'Minh Giang',
        isUserAdmin: true,
        isLocked: false
      };
    }
    return null;
  }
}
