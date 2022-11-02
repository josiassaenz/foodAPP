import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiService } from './../services/api.service';

@Injectable({
    providedIn: 'root'
})

export class BeneficiariesService {

    private apiUrlAllIdentifications = `identifications`;
    private apiUrlAllLocation = `locations`;
    private apiUrlAllTypeRoad = `typeroads`;
    private apiUrlAllNameRoads = `nameroads`;
    private apiUrlAllCountries = `countries`;
    private apiUrlAllBeneficiaries = `beneficiaries`;
    private apiUrlAllDeliverys = `deliverysDate`;

    constructor(
    private http: HttpClient,
    private apiServices: ApiService,
    ) { }

    getAllIdentifications() {

        return this.apiServices.get(this.apiUrlAllIdentifications)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('El producto no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estas permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getAllLocation() {

        return this.apiServices.get(this.apiUrlAllLocation)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('El producto no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estas permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getAllTypeRoad() {

        return this.apiServices.get(this.apiUrlAllTypeRoad)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('El producto no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estas permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getAllNameRoads() {

        return this.apiServices.get(this.apiUrlAllNameRoads)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('El producto no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estas permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getAllCountries() {

        return this.apiServices.get(this.apiUrlAllCountries)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('El producto no existe');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estas permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getAllBeneficiaries() {

        return this.apiServices.get(this.apiUrlAllBeneficiaries)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('No hay beneficiarios registrados');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estás permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }

    getAllDelivery() {

        return this.apiServices.get(this.apiUrlAllDeliverys)
        .pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.status === HttpStatusCode.Conflict) {
                    return throwError('Algo esta fallando en el server');
                }
                if (error.status === HttpStatusCode.NotFound) {
                    return throwError('No hay beneficiarios registrados');
                }
                if (error.status === HttpStatusCode.Unauthorized) {
                    return throwError('No estás permitido');
                }
                return throwError('Ups algo salio mal');
            })
        );
    }
}
