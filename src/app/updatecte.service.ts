import { Injectable } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { TablectesItem } from './interfaces.interface';

const compare_array: Array<string> = [
  "Serie/Numero CTRC",
  "Chave CT-e",
  "Cliente Remetente",
  "Cliente Destinatario",
  "Numero da Nota Fiscal",
  "Quantidade de Volumes",
  "Valor do Frete"
]


@Injectable({
  providedIn: 'root'
})
export class UpdatecteService {

  constructor(
    private ngxCsvParser: NgxCsvParser
  ) { }

  updatecsv(fileList: FileList) {
    let parsecsv = (fileList) =>{
      return new Promise((resolve, reject) => {
        var blob = fileList[0].slice(0, fileList[0].size, fileList[0].type);
        const newFile: File = new File([blob], 'csvFile.csv');

        this.ngxCsvParser.parse(newFile, { header: false, delimiter: ';' }).pipe().subscribe((response: Array<any>) => {
          let _parsedData = this.parseCsvArray(response);
          let parsedData: TablectesItem[] =[]
          _parsedData.forEach((element) => {
            var ctedata: TablectesItem = {
              DESTINATARIO: element['Cliente Destinatario'],
              NFE: element['Numero da Nota Fiscal'],
              NR_CONTROLE: element['Serie/Numero CTRC'],
              NR_DACTE: element['Chave CT-e'].slice(0, 44),
              REMETENTE: element['Cliente Remetente'],
              VALOR: parseFloat(element['Valor do Frete'].replace(",", ".")),
              VOLUMES: parseInt(element['Quantidade de Volumes'])
            }
            parsedData.push(ctedata)
          });
          resolve([parsedData, response.find(row => row[0] == 0)[3]])
        }, (error: NgxCSVParserError) => {
          reject(`Error ${error}`);
        });
      })
    }
    return parsecsv(fileList)
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
    if (this.check_header(parsedData)){
      return parsedData;
    }
  }
  check_header(header){
    compare_array.forEach(element => {
      if (!(element in header[0])){
        window.alert(`Campo "${element}" não consta no arquivo, confira os itens selecionados na opção 455 no SSW sistemas e gere um novo arquivo`)
        throw Error
      }
    });
    return true

  }
  
}