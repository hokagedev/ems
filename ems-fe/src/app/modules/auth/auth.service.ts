import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userName, password) {
    if (userName === 'giangtm' && password === '123456') {
      return {
        userName: 'giangtm',
        firtName: 'Tong',
        lastName: 'Minh Giang'
      };
    }
    return null;
  }
}
