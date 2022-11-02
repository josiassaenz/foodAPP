import { Component, Injectable, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/services/user.service';

// import { loadingFireToast } from 'src/assets/js/toast';
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthService,
    private userService: UserService,
  ) {}

  login: Login = {
    username: '',
    password: '',
  };

  validar: boolean = false;
  username: string = '';
  typeDataPass: boolean = false;
  hide = true;

  validation_messages = {
    username: [
      { type: 'required', message: ' El usuario es requerido.' },
      { type: 'pattern', message: ' Ingrese un usuario válido.' },
    ],
    password: [{ type: 'required', message: ' La constraseña es requerida.' }],
  };

  ngOnInit(): void {

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

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.roles(this.f.username.value);
          this.router.navigate(['/delivery']);
        },
        error: (error) => {
          this.error = error;
        },
      });
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
    console.log(msg);
    // Swal.fire({
    //   title: 'Confirmación',
    //   text: msg,
    //   icon: 'error',
    //   confirmButtonColor: '#e6531c',
    //   confirmButtonText: 'OK',
    // });
  }

  loadingFireToast(title) {
    console.log('Cargando . . .');
    // return Swal.fire({
    //   title,
    //   allowEscapeKey: false,
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
  }

  roles(username){
    // Asigna a las variables de sesión ID, Email y Roles
    this.userService.getOneUser(username)
    .subscribe(
      async (res: any) => {
        // console.log(res);
        this.saveData(res.userId, res.emailUser, res.roles);
        
      },
      (error: any) => {
        console.log('error de parametros', error);
      }
    );
  }

  saveData(userId: any, emailUser: string, roles: string) {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('emailUser', emailUser);
    sessionStorage.setItem('roles', roles);
  }
  getDataUserId() {
    return sessionStorage.getItem('userId');
  }

  getDataEmailUser() {
    return sessionStorage.getItem('emailUser');
  }

  getDataRoles() {
    return sessionStorage.getItem('roles');
  }

  removeData() {
    sessionStorage.removeItem('roles');
  }
  
  deleteData() {
    sessionStorage.clear();
  }

}
