import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { EmsUser } from '../auth/models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  baseUrl = 'http://localhost:9999';
  constructor(
    private http: HttpClient
  ) { }

  public getUsers() {
    return this.http.get(this.baseUrl + '/users');
  }
}
