import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Parametro } from "./cards/cards.interface"

const baseUrl = 'http://localhost:8000/api';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private funcao: string
  constructor(
    private http: HttpClient,
    ) { }

  getparametro(parametro: string): Observable<Parametro> {
    this.funcao = "parametros"
    return this.http.get<Parametro>(`${baseUrl}/${this.funcao}/${parametro}?format=json`)

    //{"id":1,"parametro":"lastsincsp","valor":"2020-12-06 02:27:36"}
  }
}
