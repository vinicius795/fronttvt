import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargos, Cars, Employee, TablectesItem } from './interfaces.interface'
import { REntregas } from './r-entregas/r-entregas.interface';
import { FormGroup, NgForm } from '@angular/forms';
import { isDevMode } from '@angular/core';

const base_dev_Url = 'http://localhost:1234/api';
const baseUrl = 'http://10.1.1.8:5241/api';

// vpn port 56957


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
    if (isDevMode) return base_dev_Url
    return baseUrl
  }

  getseting(parametro: string, edit: boolean = false, data: any = ""): Observable<any> {
    this.funcao = "parametros"
    if(edit){
      return this.http.patch<any>(`${this.baseurl}/${this.funcao}/${parametro}`, data)
    }
    return this.http.get<any>(`${this.baseurl}/${this.funcao}/${parametro}`)
  }
  sincsp(): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.get<any>(`${this.baseurl}/${this.funcao}`)
  }
  getcte(tipo: string, value: number): Observable<any> {
    this.funcao = "cte"
    return this.http.get<any>(`${this.baseurl}/${this.funcao}/${tipo}/${value}`)
  }
  addcte(dados: TablectesItem): Observable<any> {
    this.funcao = 'cte/add'
    return this.http.post<any>(`${this.baseurl}/${this.funcao}`, dados)
  }
  addctenf(dados: any): Observable<any>{
    this.funcao = 'relatorios/entrega/ctenf/add'
    return this.http.post<any>(`${this.baseurl}/${this.funcao}`, dados)
  }
  get_employee(args: any): Observable<any> {
    if (("cargo" in args) !== ("id" in args)) {
      if ("cargo" in args) {
        this.funcao = 'funcionarios/cargos'
        return this.http.get<Employee[]>(`${this.baseurl}/${this.funcao}/${args.cargo}`)
      } else if ("id" in args) {
        this.funcao = 'funcionarios/id'
        return this.http.get<Employee>(`${this.baseurl}/${this.funcao}/${args.id}`)
      }
    } else if (Object.entries(args).length === 0) {
      this.funcao = 'funcionarios'
      return this.http.get<Employee[]>(`${this.baseurl}/${this.funcao}/`)
    }
  }
  add_edit_employee(data: Employee, edit: boolean, id: number = undefined): Observable<Employee>{
    if(!edit){
      this.funcao = "funcionarios/novo"
      return this.http.post<Employee>(`${this.baseurl}/${this.funcao}/`, data)
    }
    if(edit){
      this.funcao = "funcionarios/id"
      return this.http.patch<Employee>(`${this.baseurl}/${this.funcao}/${id}/update`, data)
    }
  }
  get_position(): Observable<Cargos[]> {
    this.funcao = 'funcionarios/cargos'
    return this.http.get<Cargos[]>(`${this.baseurl}/${this.funcao}/`)
  }
  add_edit_position(data: Cargos, edit: boolean = false, id: number = undefined): Observable<Cargos>{
    if(!edit){
      this.funcao = 'funcionarios/cargos/add/'
      return this.http.post<Cargos>(`${this.baseurl}/${this.funcao}`, data)
    }
    if(edit){
      this.funcao = 'funcionarios/cargos/';
      return this.http.patch<Cargos>(`${this.baseurl}/${this.funcao}/${id}`, data)
    }
  }
  get_car(): Observable<any> {
    this.funcao = 'funcionarios/veiculos'
    return this.http.get<any>(`${this.baseurl}/${this.funcao}/`)
  }
  add_edit_car(data: Cars, edit: boolean, id: number = undefined): Observable<Cars>{
    this.funcao = 'funcionarios/veiculos'
    if(edit){
      return this.http.patch<Cars>(`${this.baseurl}/${this.funcao}/edit/${id}`, data)
    }if(!edit){
      return this.http.post<Cars>(`${this.baseurl}/${this.funcao}/?format=json`, data)
    }
  }
  getrelatorioentrega(id): Observable<any> {
    this.funcao = 'relatorios/entrega'
    return this.http.get<any>(`${this.baseurl}/${this.funcao}/${id}?format=json`)
  }
  saverelatorioentrega(dados: REntregas) {
    this.funcao = 'relatorios/entrega/save'
    return this.http.post(`${this.baseurl}/${this.funcao}`, dados)
  }
  checknf(){
    this.funcao = 'relatorios/entrega/checkmissing'
    return this.http.get(`${this.baseurl}/${this.funcao}`)
  }
  search(term: string){
    this.funcao = 'search'
    return this.http.get(`${this.baseurl}/${this.funcao}/${term}`)
  }
  create_user(form: FormGroup){
    this.funcao="users"
    return this.http.post(`${this.baseurl}/${this.funcao}/`, form)
  }
  get_users(){
    this.funcao = "users"
    return this.http.get(`${this.baseurl}/${this.funcao}/`)
  }
  get_report_today(){
    this.funcao = "reports/today"
    return this.standard_get(this.funcao)
  }
  standard_get(funcao){
    return this.http.get(`${this.baseurl}/${funcao}`)
  }
}
