import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BeneficiariesService } from './../services/beneficiaries.service';
import { Beneficiary } from './../model/beneficiaries.model';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;

  displayedColumns: string[];
  listBeneficiaries: Beneficiary[] = [];
  titleTable: string;
  subTitleTable: string;
  data: any;
  columns: string[];
  content: any;

  constructor(
    private beneficiariesService: BeneficiariesService,
  ) { }

  ngOnInit() {
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('informe_banco_de_alimentos_IVD.pdf');
    });
  }

  beneficiaryList() {

    this.beneficiariesService.getAllDelivery()
    .subscribe(data => {

      this.data = data;
      this.columns = Object.keys(this.data[0]);

      this.titleTable = 'Lista Beneficiarios';
      this.subTitleTable = 'Total';
      this.displayedColumns = ['No.','Nombres','Número de Contacto','Firma'];
      
      for (let i = 0; i < data.length; i++){
        this.listBeneficiaries[i] = {
          id: data[i]['id'],
          names: data[i]['names'] + ' ' + data[i]['firstSurname'] + ' ' + data[i]['secondSurname'],
          celPhone: data[i]['celPhone'],
          kg: data[i]['kg'],
          signture: data[i]['signture']
        };
      }
      this.data = this.listBeneficiaries;
      this.columns = Object.keys(this.listBeneficiaries[0]);
      this.listBeneficiaries = data;
      // console.log('testing: ',this.data);
      // console.log('displays: ',this.displayedColumns);
      // console.log('columns: ',this.columns);
    });
  }

  // beneficiaryListDate() {

  //   this.beneficiariesService.getAllDelivery()
  //   .subscribe(data => {

  //     this.data = data;
  //     this.columns = Object.keys(this.data[0]);

  //     this.titleTable = 'Lista Beneficiarios';
  //     this.subTitleTable = 'Total';
  //     this.displayedColumns = ['No.','Nombres','Número de Contacto','Firma'];
      
  //     for (let i = 0; i < data.length; i++){
  //       this.listBeneficiaries[i] = {
  //         id: data[i]['id'],
  //         names: data[i]['names'] + ' ' + data[i]['firstSurname'] + ' ' + data[i]['secondSurname'],
  //         celPhone: data[i]['celPhone'],
  //         signture: data[i]['signture']
  //       };
  //     }
  //     this.data = this.listBeneficiaries;
  //     this.columns = Object.keys(this.listBeneficiaries[0]);
      
  //     // this.listBeneficiaries = data;
  //     // console.log('testing: ',this.data);
  //     // console.log('displays: ',this.displayedColumns);
  //     // console.log('columns: ',this.columns);
  //   });
  // }
}
