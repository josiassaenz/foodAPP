import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ParentErrorStateMatcher, PasswordValidator } from '../services/validator/password-validator';
import { ApiService } from 'app/services/api.service';

interface Rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-facilitator',
  templateUrl: './facilitator.component.html',
  styleUrls: ['./facilitator.component.scss']
})
export class FacilitatorComponent implements OnInit {

  accountDetailsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;
  matching_passwords_group: FormGroup;
  formGroup: FormGroup;
  selectedRol: string;
  hide = true;
  rol: string;
  email: string;
  password: string;
  confirm_password: string;
  isActive: number = 0;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  roles: Rol[] = [
    {value: 'ROLE_SUPER_ADMIN', viewValue: 'SuperAdmin'},
    {value: 'ROLE_ADMIN', viewValue: 'Admin'},
    {value: 'ROLE_FACILITATOR', viewValue: 'Facilitador'},
  ];

  account_validation_messages = {
    'rol': [
      { type: 'required', message: 'El rol es requerido' },
    ],
    'email': [
      { type: 'required', message: 'El correo eletrónico es inválido' },
      { type: 'pattern', message: 'El correo electrónico es inválido' }
    ],
    'confirm_password': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'areEqual', message: 'La contraseña no coincide' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida' },
      { type: 'minlength', message: 'La contraseña debe contener mínumo 8 caracteres' },
      { type: 'pattern', message: 'La contraseña debe contener una letra minúscula, una letra mayúscula y un número' }
    ]
  }

  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
  ) { }

  ngOnInit(): void {

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.accountDetailsForm = this.fb.group({
      rol: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
    })
  }

  onSubmitAccountDetails(value: any){

    const parametros = {
      email: this.email,
      rol : this.selectedRol,
      password: this.password,
      isActive: this.isActive,
    };
    // console.log(parametros);
    this.apiServices
        .post(
          `register`,
          parametros
        )
        .subscribe(
          async (res: any) => {
            console.log(res);
            this.rol = '';
            this.email = '';
            this.password = '';
            this.confirm_password = '';
          },
          (error: any) => {
            console.log('error editando los parametros', error);
          }
        );
    // console.log(value);
  }

}

