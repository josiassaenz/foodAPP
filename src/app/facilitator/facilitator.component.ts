import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facilitator',
  templateUrl: './facilitator.component.html',
  styleUrls: ['./facilitator.component.css']
})
export class FacilitatorComponent implements OnInit {

  countries: any;

  constructor(private apiService:ApiService) { }

  ngOnInit() {
    // las funciones precargadas this.departamento();
  }

  async departamento(dep: any) { // cambiar departamento
    
    const loading: any = this.loadingFireToast(
      'Cargando ciudades, por favor espere...'
    );
    await this.apiService
      .get(
        `ruteCall`
      )
      .subscribe(
        async (res: any) => {
          loading.close();
          console.log(res);
        },
        (error: any) => {
          loading.close();
          console.log('error consultando los departamentos', error);
          this.toastFireError(error);
        }
      );
  }

  prueba () {
    const data={
      username: '',
      password: ''
    }

    const loading: any = this.loadingFireToast(
      'Cargando ciudades, por favor espere...' 
    );
    this.apiService.post('loans/update-form', data).subscribe( // cambiar la URL
      (res: any) => {
        loading.close();
        if (res.status) {
          Swal.fire({
            icon: 'success',
            title: 'Envío del formulario exitoso',
            timer: 4000,
          });
          window.location.reload();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar los datos',
            timer: 2000,
          });
        }
      },
      (error: any) => {
        console.log('error consultando...', error);
      }
    );
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

  toastFireError(res: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: res.message,
      timer: 2000,
    }).then(() => {
      //window.location.href = window.location.href = "/home/dashboard";
    });
  }

}
