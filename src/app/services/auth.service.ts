import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/userLogged';
import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { UserService } from './../services/user.service';
// import { AdminLayoutComponent } from 'app/layouts/admin-layout/admin-layout.component';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentLoginSubject: BehaviorSubject<any>;
  // private currentLoginSubject: BehaviorSubject<LoginResponse>;
  public currentLogin: Observable<any>;
  public auth = false;
  user: any;

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // const currentUser = JSON.parse(sessionStorage.getItem('roles') || '{}');
    this.currentUserSubject = new BehaviorSubject<User>(
      currentUser ? currentUser : '{}'
    );
    this.currentUser = this.currentUserSubject.asObservable();
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    this.currentLoginSubject = new BehaviorSubject<any>(
      token ? token : '{}'
    );
    
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentLoginValue(): any {
    return this.currentLoginSubject.value;
  }

  public get isAuth(): boolean {
    const token = JSON.parse(localStorage.getItem('token') || 'null');
    this.currentLoginSubject = new BehaviorSubject<any>(
      token === JSON.parse('null') ? null : token
    );
    
    return this.currentLoginSubject.value !== null;
  }

  // login(credential: any) {
  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.API}login_check`, { "username": username, "password": password })
      .pipe(
        map(
          ({token}) => {
            this.auth = true;
            // console.log('From Auth: ', this.auth);
            let user: User = {
              email: username,
              token: token,
            };          

            localStorage.setItem('token', JSON.stringify(user.token));
            this.currentUserSubject.next(user);
            // console.log(user.token);
            return user.token;
          },
          (error: any) => {
            console.log('error: ',error);
            return false;
          }
        )
      );
  }

  getOneUser(value: any) {
    this.userService.getOneUser(value)
    .subscribe(data => {
      this.user = data;
    });
  }

  // get() {
  //   return this.http
  //     .get<any>(`${environment.API}auth/get-info`)
  //     .pipe(map((d) => d));
  // }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    window.location.replace('#/login');
  }
}
