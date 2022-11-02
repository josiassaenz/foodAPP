import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import * as moment from 'moment';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})

export class DeliveryComponent implements OnInit {

  numberIdentification: string;
  names: string;
  id: any;
  kg: any;
  message_error: string;
  validation_message: boolean = false;
  accountDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiServices: ApiService,
  ) { }

  ngOnInit(): void {
    this.accountDetailsForm = this.fb.group({
      numberIdentification: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      names: new FormControl('', Validators.required),
      kg: new FormControl('', Validators.required),
    })

  }
  
  async beneficiary($event: any) {

    if (!this.validation_message) {
      this.names = '';
      this.kg = '';
    }

    this.numberIdentification = typeof $event === 'string' ? $event.toUpperCase() : '';

    if (this.numberIdentification !== '' && this.numberIdentification !== undefined) {

      await this.apiServices
      .get(
        `beneficiarie/${this.numberIdentification}`
      )
      .subscribe(
        async (res: any) => {
          if (res.error) {
            this.validation_message = true;
            this.message_error = 'Número de documento no registrado';
            // console.log(this.validation_message, res.error);
          } else {
            this.validation_message = false;
            this.names = res.names + ' ' + res.firstSurname + ' ' + res.secondSurname;
            this.id = res.id;
            // console.log(this.validation_message);
          }
        },
        (error: any) => {
          this.validation_message = true;
          this.message_error = 'El número de documento es requerido';
          // console.log(error);
        }
      )
    
    }

    return null;
  }
  
  onSubmitAccountDetails(value: any){

    const date = moment().format('YYYY-MM-DD')

    const parametros = {
      idBeneficiarie : this.id,
      kg: this.kg,
      date: date
    };
    this.apiServices
        .post(
          `delivery`,
          parametros
        )
        .subscribe(
          async (res: any) => {
            console.log(res);
            this.numberIdentification = '';
            this.names = '';
            this.kg = '';
          },
          (error: any) => {
            console.log('error editando los parametros', error);
          }
        );
    // console.log(value);
  }

}

