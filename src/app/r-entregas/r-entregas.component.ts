import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';
import { Funcionario, Cargos } from '../interfaces.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-r-entregas',
  templateUrl: './r-entregas.component.html',
  styleUrls: ['./r-entregas.component.scss']
})
export class REntregasComponent implements OnInit {

  funcionarios: Funcionario
  selected_func: Funcionario
  motoristas = []
  select_motorista: string
  ajudantes = []
  select_ajudante: Funcionario
  all_cte = []
  cargos: Cargos
  selected_cargos = []
  cte: number

  constructor(
    private api: ApiService,
  ) {
    this.getcargos();
    this.getfunc();
  }

  getCTE(){
    //console.log(this.cte)
    if (this.cte.toString().length == 44 ){
      this.api.getcte("dacte", this.cte).subscribe(res => {
        this.all_cte.push(res); 
        this.cte = null
      })
    }
  }

  onchange(f:NgForm){
    this.selected_cargos=[]
    var x,y,z,w, _selected_funcionario
    for (x in f.value){
      if(f.value[x] == true){
        for(y in this.cargos){
          if(this.cargos[y].CARGO == x){
            _selected_funcionario = []
            for(z in this.funcionarios){
              for(w in this.funcionarios[z].CARGO){
                if(this.funcionarios[z].CARGO[w].CARGO == x)
                _selected_funcionario.push(this.funcionarios[z])
              }
            }
          }
        } this.selected_cargos.push({ "cargo": x, "funcionarios": _selected_funcionario})
      }
    }
  }

  getcargos(){
    this.api.getcargos().subscribe(res => {res.forEach(element => {
        element.CARGO == "Motorista" ? element.checked = true : element.checked = false
    }); this.cargos = res
    })
  }
  getfunc(){
    this.api.getfunc({}).subscribe(res => this.funcionarios = res)
  }
  
  ngOnInit(): void {
  }

}
