import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class addcte {
  nr_dacte: string;
  remetente: string;
  destinatario: string;
  nr_controle: string;
  valor: number;
  volumes: string;
  nfe: string;
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
  private response: any;
  constructor(
    private http: HttpClient,
    ) { }
  

  getseting(parametro: string): Observable<any> {
    this.funcao = "parametros"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${parametro}?format=json`)
  }
  sincsp(): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.get<any>(`${baseUrl}/${this.funcao}`)
  }
  getcte(tipo: string, value: number ): Observable<any>{
    this.funcao = "cte"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${tipo}/${value}`)
  }
  addcte(dados: any): Observable<any>{
    this.funcao = 'add'
    return this.http.post<any>(`${baseUrl}/${this.funcao}`, dados)
  }
  getfuncionario(cargo: string,): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.get<any>(`${baseUrl}/${this.funcao}`)
  }
}

