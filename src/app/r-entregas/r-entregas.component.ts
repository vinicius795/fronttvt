import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CTE, Funcionario } from '../interfaces.interface';

@Component({
  selector: 'app-r-entregas',
  templateUrl: './r-entregas.component.html',
  styleUrls: ['./r-entregas.component.scss']
})
export class REntregasComponent implements OnInit {

  motoristas = []
  select_motorista: string
  ajudantes = []
  select_ajudante: Funcionario
  all_cte: CTE[]
  cte: number

  constructor(
    private api: ApiService,
  ) { }
  getCTE(){
    this.api.getcte("dacte", this.cte).subscribe(res => this.all_cte.push(res))
  }
  getFuncionarios(){
    var x: any
    this.api.getfunc({}).subscribe(res => {
      res.forEach((element: Funcionario) => {
        for (x in element.CARGO){
          if (element.CARGO[x] == 1){
            this.motoristas.push(element)
          } else if (element.CARGO[x] == 2){
            this.ajudantes.push(element)
          }
        }
      });
    })

  }

  ngOnInit(): void {
    this.getFuncionarios()
  }

}