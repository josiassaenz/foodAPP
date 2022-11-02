import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import SignaturePad from '../../../node_modules/signature_pad';
import { ApiService } from './../services/api.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { BeneficiariesService } from './../services/beneficiaries.service';
import { Identification, Location, TypeRoad, NameRoad, Country } from './../model/beneficiaries.model';
import * as moment from 'moment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [ ],
})

export class UserProfileComponent implements OnInit, AfterViewInit {

  title = 'Firma digital';

  @ViewChild('sPad', {static: true}) signaturePadElement: { nativeElement: HTMLCanvasElement; };
  signaturePad: any;
  dataURL: any;
  identifications: Identification[] = [];
  locations: Location[] = [];
  typeRoads: TypeRoad[] = [];
  nameRoads: NameRoad[] = [];
  countries: Country[] = [];
  selectedIdentification: string;
  selectedLocation: string;
  selectedTypeRoad: string;
  selectedNameRoad: string;
  selectedCountry: string;
  minDate: Date;
  maxDate: Date;
  minDateExpiration: Date;
  maxDateExpiration: Date;
  identification: string;
  movil: number;
  familyUnit: number;
  names: string;
  lastname: string;
  secondname: string;
  otherData: string;
  bornDate: string;
  statusDocumentation: string;
  signature: string;
  signaturValidator: boolean = false;
  color: ThemePalette = 'warn';
  filedata: any;
  facilitatorForm: FormGroup;
  imagePath: any;
  email: string = 'wg@com.co';
  province: number = 28;
  statusDocuments: number = 0;
  termsConditions: number = 0;
  validation_message: boolean = false;
  message_error: string = '';
  validation_repeat_dni: boolean = false;
  matcher = new MyErrorStateMatcher();


  account_validation_messages = {
    'typeIdentification': [
      { type: 'required', message: 'El rol es requerido' },
    ],
    'identification': [
      { type: 'required', message: 'Número de identificación es requerido' },
      { type: 'verifyIdentification', message: 'Identificación ya se encuentra registrada' },
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
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private apiServices: ApiService,
    public fb: FormBuilder,
    private beneficiariesService: BeneficiariesService,
  ) { 
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 12, 11, 31);
    this.minDateExpiration = new Date(currentYear, currentMonth, currentDate);
    this.maxDateExpiration = new Date(currentYear, currentMonth + 3, currentDate + 1);
  }

  ngOnInit() {

    this.facilitatorForm = this.fb.group({
      selectedIdentification: new FormControl('', Validators.required),
      identification: new FormControl('', Validators.required),
      movil: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(9)
      ])),
      familyUnit: new FormControl('', Validators.required),
      names: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      secondname: new FormControl('', Validators.required),
      selectedLocation: new FormControl('', Validators.required),
      selectedTypeRoad: new FormControl('', Validators.required),
      selectedNameRoad: new FormControl('', Validators.required),
      otherData: new FormControl('', Validators.required),
      selectedCountry: new FormControl('', Validators.required),
      bornDate: new FormControl('', Validators.required),
      statusDocumentation: new FormControl('', Validators.required),
    })

    this.beneficiariesService.getAllIdentifications()
    .subscribe(data => {
      this.identifications = data;
    });

    this.beneficiariesService.getAllLocation()
    .subscribe(data => {
      this.locations = data;
    });

    this.beneficiariesService.getAllTypeRoad()
    .subscribe(data => {
      this.typeRoads = data;
    });

    this.beneficiariesService.getAllNameRoads()
    .subscribe(data => {
      this.nameRoads = data;
    });

    this.beneficiariesService.getAllCountries()
    .subscribe(data => {
      this.countries = data;
    });
  }

  onSubmitAccountDetails(value: any){

    const date = moment(this.bornDate).format('YYYY-MM-DD')

    const parametros = {
      names: this.names,
      born: date,
      email: this.email,
      signture: this.dataURL,
      country: this.selectedCountry,
      province: 28,
      location: this.selectedLocation,
      firstSurname: this.lastname,
      secondSurname: this.secondname,
      celPhone: this.movil,
      typeIdentification : this.selectedIdentification,
      numberIdentification: this.identification,
      typeRoad: this.selectedTypeRoad,
      nameRoad: this.selectedNameRoad,
      otherDirection: this.otherData,
      statusDocuments: this.statusDocuments,
      familyUnit: this.familyUnit,
      termsConditions: this.termsConditions,
    };
    // console.log(parametros);
    this.apiServices
        .post(
          `beneficiarie`,
          parametros
        )
        .subscribe(
          async (res: any) => {
            console.log(res);
            this.names = '';
            this.bornDate = '';
            this.email = '';
            this.dataURL = '';
            this.selectedCountry = '';
            this.province = 0;
            this.selectedLocation = '';
            this.lastname = '';
            this.secondname = '';
            this.movil = 0;
            this.selectedIdentification = '';
            this.identification = '';
            this.selectedTypeRoad = '';
            this.selectedNameRoad = '';
            this.otherData = '';
            this.statusDocumentation = '';
            this.familyUnit = 0;
          },
          (error: any) => {
            console.log('error editando los parametros', error);
          }
        );
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement, {
      minWidth: 0.5,
      maxWidth: 2.5,
    });
  }

  drawComplete(e: any) {
    if (this.signaturePad.isEmpty()) {
      this.signaturValidator = this.signaturePad.isEmpty();
      // console.log("La firma es requerida");
    } else {
      this.signaturValidator = true;
      this.termsConditions = 1;
      this.dataURL = this.signaturePad.toDataURL('image/png');
      // console.log(this.dataURL);
    }
  }

  drawStart() {
    // console.log('Ingreso de Firma');
  }

  clearSignature() {
    this.signaturePad.clear();
    this.signaturValidator = this.signaturePad.isEmpty();
  }

  async savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.dataURL = this.signaturePad.toDataURL();
  }

  signUndo(){
    const datos = this.signaturePad.toData();
    if(datos){
      datos.pop();
      this.signaturePad.fromData(datos);
    }
  }

  async beneficiary(d: any) {

    // if (!this.validation_message) {
    //   this.signaturValidator = false;
    // }

    this.identification = typeof d === 'string' ? d.toUpperCase() : '';

    if (this.identification !== '' && this.identification !== undefined) {
    
      await this.apiServices
      .get(
        `beneficiarie/${this.identification}`
      )
      .subscribe(
        async (res: any) => {
          if (res.error) {
            this.validation_message = false;
            this.message_error = '';
            this.validation_repeat_dni = true;
            // console.log(this.validation_message, res.error);
            return false;
          }

          if (res.id !== undefined) {
            this.validation_message = true;
            this.validation_repeat_dni = false;
            this.message_error = 'Número de documento ya registrado';
            console.log(this.validation_message, this.message_error);
            return true;
          }
        },
        (error: any) => {
          this.validation_message = true;
          this.message_error = 'El número de documento es requerido';
          // console.log(error);
          return true;
        }
      )
    
    }

    return null;
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid);
  }
}
