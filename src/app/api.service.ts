import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargos, Cars, Employee, TablectesItem } from './interfaces.interface'
import { REntregas } from './r-entregas/r-entregas.interface';
import { FormGroup, NgForm } from '@angular/forms';

//const baseUrl = 'http://localhost:8000/api';
//const baseUrl = 'http://localhost:5241/api';
//const baseUrl = 'http://192.168.0.107:8000/api';
//const baseUrl = 'http://200.195.182.36:8000/api';
const baseUrl = 'http://10.1.1.8:5241/api';

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
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${parametro}`)
  }

  sincsp(): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.get<any>(`${baseUrl}/${this.funcao}`)
  }

  getcte(tipo: string, value: number): Observable<any> {
    this.funcao = "cte"
    return this.http.get<any>(`${baseUrl}/${this.funcao}/${tipo}/${value}`)
  }

  addcte(dados: TablectesItem): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.post<any>(`${baseUrl}/${this.funcao}`, dados)
  }
  addctenf(dados: any): Observable<any>{
    this.funcao = 'relatorios/entrega/ctenf/add'
    return this.http.post<any>(`${baseUrl}/${this.funcao}`, dados)
  }

  get_employee(args: any): Observable<any> {
    if (("cargo" in args) !== ("id" in args)) {
      if ("cargo" in args) {
        this.funcao = 'funcionarios/cargos'
        return this.http.get<Employee[]>(`${baseUrl}/${this.funcao}/${args.cargo}`)
      } else if ("id" in args) {
        this.funcao = 'funcionarios/id'
        return this.http.get<Employee>(`${baseUrl}/${this.funcao}/${args.id}`)
      }
    } else if (Object.entries(args).length === 0) {
      this.funcao = 'funcionarios'
      return this.http.get<Employee[]>(`${baseUrl}/${this.funcao}/`)
    }
  }
  add_edit_employee(data: Employee, edit: boolean, id: number = undefined): Observable<Employee>{
    if(!edit){
      this.funcao = "funcionarios/novo"
      return this.http.post<Employee>(`${baseUrl}/${this.funcao}/`, data)
    }
    if(edit){
      this.funcao = "funcionarios/id"
      return this.http.patch<Employee>(`${baseUrl}/${this.funcao}/${id}/update`, data)
    }
  }

  get_position(): Observable<Cargos[]> {
    this.funcao = 'funcionarios/cargos'
    return this.http.get<Cargos[]>(`${baseUrl}/${this.funcao}/`)
  }
  add_position(data: Cargos): Observable<Cargos>{
    this.funcao = 'funcionarios/cargos/add/'
    return this.http.post<Cargos>(`${baseUrl}/${this.funcao}`, data)
  }

  get_car(): Observable<any> {
    this.funcao = 'funcionarios/veiculos'
    return this.http.get<any>(`${baseUrl}/${this.funcao}/`)
  }

  add_edit_car(data: Cars, edit: boolean, id: number = undefined): Observable<Cars>{
    this.funcao = 'funcionarios/veiculos'
    if(edit){
      return this.http.patch<Cars>(`${baseUrl}/${this.funcao}/edit/${id}`, data)
    }if(!edit){
      return this.http.post<Cars>(`${baseUrl}/${this.funcao}/?format=json`, data)
    }
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
  search(term: string){
    this.funcao = 'search'
    return this.http.get(`${baseUrl}/${this.funcao}/${term}`)
  }
  create_user(form: FormGroup){
    this.funcao="users"
    return this.http.post(`${baseUrl}/${this.funcao}/`, form)
  }
  get_users(){
    this.funcao = "users"
    return this.http.get(`${baseUrl}/${this.funcao}/`)
  }
}