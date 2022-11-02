import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiService } from './../services/api.service';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private apiUrlAllUsers = `users`;
    private apiUrlOneUser = 'user/';

    constructor(
    private http: HttpClient,
    private apiServices: ApiService,
    ) { }

    getAllUsers() {

        return this.apiServices.get(this.apiUrlAllUsers)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('Los usuarios no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estás permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getOneUser(value: any) {

        return this.apiServices.get(`user/${value}`)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('El usuario no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estas permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

}
