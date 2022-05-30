import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogged } from 'app/model/userLogged';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserLogged>;
  public currentUser: Observable<UserLogged>;
  private currentLoginSubject: BehaviorSubject<any>;
  // private currentLoginSubject: BehaviorSubject<LoginResponse>;
  public currentLogin: Observable<any>;
  public auth = false;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject = new BehaviorSubject<UserLogged>(
      currentUser ? currentUser : '{}'
    );
    this.currentUser = this.currentUserSubject.asObservable();
    const token = JSON.parse(localStorage.getItem('tokenUser') || '{}');
    this.currentLoginSubject = new BehaviorSubject<any>(
      token ? token : '{}'
    );
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  public get currentUserValue(): UserLogged {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: UserLogged) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentLoginValue(): any {
    return this.currentLoginSubject.value;
  }

  public get isAuth(): boolean {
    const token = JSON.parse(localStorage.getItem('tokenUser') || 'null');
    this.currentLoginSubject = new BehaviorSubject<any>(
      token === JSON.parse('null') ? null : token
    );
    return this.currentLoginSubject.value !== null;
  }

  login(credential: any) {
    return this.http
      .post<any>(`${environment.API}login_check`, credential)
      .pipe(
        map(
          (d) => {
            if (d.status) {
              this.auth = true;
              localStorage.setItem('tokenUser', JSON.stringify(d.data.token));
              this.currentLoginSubject.next(d);
            }
            return d.status;
          },
          (error: any) => {
            console.log('error al realizar el login', error);
            return false;
          }
        )
      );
  }

  get() {
    return this.http
      .get<any>(`${environment.API}auth/get-info`)
      .pipe(map((d) => d));
  }
}
