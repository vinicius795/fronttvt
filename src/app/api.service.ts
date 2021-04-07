import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargos } from './interfaces.interface'

@Injectable({
  providedIn: 'root'
})
export class AddCTe {
  
  nr_dacte: string;
  remetente: string;
  destinatario: string;
  nr_controle: string;
  valor: number;
  volumes: string;
  nfe: string;
  
  constructor (
    private header = [],
    private line = []
    ){}
    
  xml(arquivo: any){
    
  }
  csv(arquivo: FileList){
    let file: File = arquivo.item(0);
    let reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let csv: any = reader.result;
      let allTextLines = [];
      allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[1].split(';');
      let data = headers;
      let tarr = [];
      for (let j = 0; j < headers.length; j++){
        tarr.push(data[j]);
      }
      this.header.push(tarr);
    } 
    return this.header
 

  }
  sswweb(arquivo: any){
    return this.csv(arquivo)
    
  }
}

export class SystemSetings {
  id: number
  parametro: string
  valor: string
}

const baseUrl = 'http://localhost:8000/api';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private funcao: string;
  constructor(
    private http: HttpClient,
    ) { }
  

  getseting(parametro: string): Observable<any> {
    this.funcao = "parametros"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${parametro}?format=json`)
  }
  sincsp(): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.get<any>(`${baseUrl}/${this.funcao}?format=json`)
  }
  getcte(tipo: string, value: number ): Observable<any>{
    this.funcao = "cte"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${tipo}/${value}?format=json`)
  }
  addcte(dados: any): Observable<any>{
    this.funcao = 'cte/add'
    return this.http.post<any>(`${baseUrl}/${this.funcao}`, dados)
  }
  getfunc(args: any): Observable<any> {
    if (("cargo" in args) !== ("id" in args)){
      if ("cargo" in args){
       this.funcao = 'funcionarios/cargos'
       return this.http.get<any>(`${baseUrl}/${this.funcao}/${args.cargo}?format=json`)
      }else if("id" in args){
        this.funcao = 'funcionarios/id'
        return this.http.get < any > (`${baseUrl}/${this.funcao}/${args.id}?format=json`)
      }
      }else if(Object.entries(args).length === 0){
        this.funcao = 'funcionarios'
       return this.http.get<any>(`${baseUrl}/${this.funcao}?format=json`)
    }
  }
  getcargos(): Observable<Cargos>{
    this.funcao = 'funcionarios/cargos'
    return this.http.get<Cargos>(`${baseUrl}/${this.funcao}?format=json`)
  }
  getrelatorioentrega(id): Observable<any>{
    this.funcao = 'relatorios/entrega'
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${id}?format=json`)
  }
  saverelatorioentrega(dados: any){
    this.funcao = 'relatorios/entrega/save'
    return this.http.post(`${baseUrl}/${this.funcao}`, dados)
  }
}