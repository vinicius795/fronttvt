import { Component, OnInit } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { element } from 'protractor';
import { ApiService, } from '../api.service';
import { TablectesItem } from '../interfaces.interface'

@Component({
  selector: 'app-updatecte',
  templateUrl: './updatecte.component.html',
  styleUrls: ['./updatecte.component.scss']
})

export class UpdatecteComponent implements OnInit {
  teste = []
  constructor(
    private api: ApiService,
    private ngxCsvParser: NgxCsvParser
  ) { }

  updatecsv(fileList: FileList) {
    var blob = fileList[0].slice(0, fileList[0].size, fileList[0].type);
    const newFile: File = new File([blob], 'csvFile.csv');

    let parsedData = [];

    this.ngxCsvParser.parse(newFile, { header: false, delimiter: ';' }).pipe().subscribe((response: Array<any>) => {
      parsedData = this.parseCsvArray(response);

      console.log(parsedData);
      
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
    

    // console.log('aguarde')

    // let arq = this.api.csv(file)
    // let ctedata: TablectesItem

    // for (let x in arq) {
    //   console.log(arq)
    //   ctedata.DESTINATARIO = arq[x]['Cliente Destinatario']
    //   ctedata.NFE = arq[x]['']
    //   ctedata.NR_CONTROLE = arq[x]['CTRC']
    //   ctedata.NR_DACTE = arq[x]['Chave CTe']
    //   ctedata.REMETENTE = arq[x]['Cliente Remetente']
    //   ctedata.VALOR = arq[x]['Valor do Frete']
    //   ctedata.VOLUMES = arq[x]['']
    // }
    // console.log('depois')
  }

  private parseCsvArray(csvArray: any[]): any[] {
    var parsedData = [];

    var headers = csvArray.find(row => row[0] == 1);
    var data = csvArray.filter(row => row[0] == 2);
    
    data.forEach(row => {
      var parsedRow = {};

      row.forEach((column, index) => {
        parsedRow[headers[index]] = column;
      });

      parsedData.push(parsedRow);
    });

    return parsedData;
  }

  ngOnInit(): void {
  }
}