import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const token = JSON.parse(localStorage.getItem('token'));

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) {}

  post(path: string, data: any): any {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Access-Control-Allow-Origin', 'Content-Type')
    // .set('Access-Control-Allow-Origin', 'POST')
    .set('Authorization', `${token.token}`);
    return this.http
      .post<any>(`${environment.API}${path}`, data, { 'headers': headers })
      .pipe(map((d) => d));
  }

  get(path: string): any {
    return this.http.get<any>(`${environment.API}${path}`).pipe(map((d) => d));
  }
  // get(path: string): any {
  //   console.log(token.token);
  //   const headers= new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*')
  //   .set('Access-Control-Allow-Origin', 'Content-Type')
  //   .set('Access-Control-Allow-Origin', 'GET')
  //   .set('Authorization', `${token.token}`);
  //   return this.http.get<any>(`${environment.API}${path}`, { 'headers': headers }).pipe(map((d) => d));
  // }

  delete(path: string): any {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Access-Control-Allow-Origin', 'Content-Type')
    // .set('Access-Control-Allow-Origin', 'DELETE')
    .set('Authorization', `${token.token}`);
    return this.http
      .delete<any>(`${environment.API}${path}`, { 'headers': headers })
      .pipe(map((d) => d));
  }

  put(path: string, data: any): any {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    // .set('Access-Control-Allow-Origin', 'Content-Type')
    // .set('Access-Control-Allow-Origin', 'PUT')
    .set('Authorization', `${token.token}`);
    return this.http
      .put<any>(`${environment.API}${path}`, data, { 'headers': headers })
      .pipe(map((d) => d));
  }
}
