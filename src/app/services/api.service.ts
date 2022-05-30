import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  post(path: string, data: any): any {
    return this.http
      .post<any>(`${environment.API}${path}`, data)
      .pipe(map((d) => d));
  }

  get(path: string): any {
    return this.http.get<any>(`${environment.API}${path}`).pipe(map((d) => d));
  }

  delete(path: string): any {
    return this.http
      .delete<any>(`${environment.API}${path}`)
      .pipe(map((d) => d));
  }

  put(path: string, data: any): any {
    return this.http
      .put<any>(`${environment.API}${path}`, data)
      .pipe(map((d) => d));
  }
}
