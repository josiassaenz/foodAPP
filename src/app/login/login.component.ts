import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { AuthService } from '../services/auth.service';
//import { loadingFireToast } from 'src/assets/js/toast';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  login: Login = {
    username: '',
    password: '',
  };
  loginForm!: FormGroup;
  validar: boolean = false;
  resetPassword: boolean = false;
  username: string = '';
  typeDataPass: boolean = false;

  validation_messages = {
    username: [
      { type: 'required', message: ' El usuario es requerido.' },
      { type: 'pattern', message: ' Ingrese un usuario válido.' },
    ],
    password: [{ type: 'required', message: ' La constraseña es requerida.' }],
  };

  ngOnInit(): void {
    const logger = localStorage.getItem('isUserLoggedIn');
    if (logger) {
      this.router.navigate(['#/delivery']);
      //this.loginUser(this.credentials);
    } else {
      this.router.navigate(['/login']);
    }
    this.loginForm = this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  loginAdmin() {
    if (!this.validateUser()) {
      return;
    }
    this.validar = false;
    const loading: any = this.loadingFireToast(
      'Validando credenciales, por favor espere...'
    );
    this.authService.login(this.login).subscribe(
      (res) => {
        loading.close();
        //localStorage.setItem('isUserLoggedIn', 'true');
        window.location.href = window.location.href = '#/delivery';
      },
      (error) => {
        loading.close();
        this.fireToast(error);
        console.log('error en el login', error);
      }
    );
  }

  validateUser() {
    if (!this.validar) {
      this.validar = true;
      this.validate(
        this.validar,
        this.login.username,
        'El usuario es requerido.',
        'username'
      );
      this.validate(
        this.validar,
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
          this.login.username
        ),
        'El usuario ingresado no es válido.',
        'username'
      );
      this.validate(
        this.validar,
        this.login.password,
        'La contraseña es requerida',
        'password'
      );
    }
    return this.validar;
  }

  validate(validate: any, condition: any, msg: any, id: any) {
    if (validate) {
      if (!condition) {
        this.validar = false;
        this.fireToast(msg);
        return false;
      }
    }
    return true;
  }

  fireToast(msg: any) {
    Swal.fire({
      title: 'Confirmación',
      text: msg,
      icon: 'error',
      confirmButtonColor: '#e6531c',
      confirmButtonText: 'OK',
    });
  }

  loadingFireToast(title) {
    return Swal.fire({
      title,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

}
