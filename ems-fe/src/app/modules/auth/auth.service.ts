import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BehaviorSubject, of, Subscription, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { environment as config } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public auth$ = this.authSubject.asObservable();
  returnUrl = '/';
  refreshSubscription: Subscription;

  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public login(userName: string, password: string, returnUrl: string) {
    return this.http.post<any>(
      `${config.auth.authurl}${config.auth.authloginpath}`,
      {
        'username': userName,
        'password': password
      }).pipe(map(authResult => {
        this.returnUrl = returnUrl;
        // if (authResult && authResult.access_token) {
        console.log(authResult);
        if (authResult) {
          this.setSession(authResult);
          this.authSubject.next(true);
        } else {
          this.authSubject.next(false);
        }
        return authResult;
      }));
  }

  setSession(authResult): void {
    const expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('currentUser', JSON.stringify(authResult));

    this.scheduleRenewal();
  }

  public scheduleRenewal(): void {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const expiresIn$ = of(expiresAt).pipe(
      mergeMap(
        // tslint:disable-next-line:no-shadowed-variable
        expiresAt => {
          const now = moment().add(2, 'minutes').valueOf();
          return timer(Math.max(1, expiresAt - now), 60000);
        }
      )
    );

    this.refreshSubscription = expiresIn$.subscribe(
      () => {
        this.renewToken();
      }
    );
  }

  public unscheduleRenewal(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  public renewToken() {
    // TODO
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public navigateAfterLogin(): void {
    this.router.navigate([this.returnUrl]).then(() => {
      this.returnUrl = '/';
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('currentUser');

    this.authSubject.next(false);
    this.router.navigate(['/login']);
  }
}
