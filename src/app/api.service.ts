import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargos, Funcionario, TablectesItem } from './interfaces.interface'
import { REntregas } from './r-entregas/r-entregas.interface';

//const baseUrl = 'http://localhost:8000/api';
//const baseUrl = 'http://192.168.0.107:8000/api';
const baseUrl = 'http://200.195.182.36:8000/api';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private funcao: string = ``
  ctes: Array<any> = []
  constructor(
    private http: HttpClient
  ) { }
  
  get baseurl(){
    return baseUrl
  }

  getseting(parametro: string): Observable<any> {
    this.funcao = "parametros"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${parametro}?format=json`)
  }

  sincsp(): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.get<any>(`${baseUrl}/${this.funcao}?format=json`)
  }

  getcte(tipo: string, value: number): Observable<any> {
    this.funcao = "cte"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${tipo}/${value}?format=json`)
  }

  addcte(dados: TablectesItem): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.post<any>(`${baseUrl}/${this.funcao}`, dados)
  }
  addctenf(dados: any): Observable<any>{
    this.funcao = 'relatorios/entrega/ctenf/add'
    return this.http.post<any>(`${baseUrl}/${this.funcao}`, dados)
  }

  getfunc(args: any): Observable<any> {
    if (("cargo" in args) !== ("id" in args)) {
      if ("cargo" in args) {
        this.funcao = 'funcionarios/cargos'
        return this.http.get<Funcionario[]>(`${baseUrl}/${this.funcao}/${args.cargo}?format=json`)
      } else if ("id" in args) {
        this.funcao = 'funcionarios/id'
        return this.http.get<Funcionario>(`${baseUrl}/${this.funcao}/${args.id}?format=json`)
      }
    } else if (Object.entries(args).length === 0) {
      this.funcao = 'funcionarios'
      return this.http.get<Funcionario[]>(`${baseUrl}/${this.funcao}?format=json`)
    }
  }

  getcargos(): Observable<Cargos[]> {
    this.funcao = 'funcionarios/cargos'
    return this.http.get<Cargos[]>(`${baseUrl}/${this.funcao}?format=json`)
  }

  getveiculo(): Observable<any> {
    this.funcao = 'funcionarios/veiculos'
    return this.http.get<any>(`${baseUrl}/${this.funcao}?format=json`)
  }

  getrelatorioentrega(id): Observable<any> {
    this.funcao = 'relatorios/entrega'
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${id}?format=json`)
  }

  saverelatorioentrega(dados: REntregas) {
    this.funcao = 'relatorios/entrega/save'
    return this.http.post(`${baseUrl}/${this.funcao}`, dados)
  }
  checknf(){
    this.funcao = 'relatorios/entrega/checkmissing'
    return this.http.get(`${baseUrl}/${this.funcao}`)
  }
}