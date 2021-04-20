import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Funcionario, Cargos } from '../interfaces.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-r-entregas',
  templateUrl: './r-entregas.component.html',
  styleUrls: ['./r-entregas.component.scss']
})
export class REntregasComponent implements OnInit {

  funcionarios: Funcionario
  all_cte = []
  cargos: Cargos
  selected_cargos = []
  all_veiculos = []
  cte: number
  obs: string


  constructor(
    private api: ApiService,
  ) {
    this.getcargos();
    this.getfunc();
    this.getveiculos();
  }
  getCTE(){
    if (this.cte.toString().length == 44 ){
      this.api.getcte("dacte", this.cte).subscribe(res => {
        this.all_cte.push(res); 
        this.cte = null
      })
      this.formatcte()
    }
    
  }
  showfunc(f:NgForm){
    this.selected_cargos=[]
    let _selected_funcionario
    for (let x in f.value){
      if(f.value[x] == true){
        for(let y in this.cargos){
          if(this.cargos[y].CARGO == x){
            _selected_funcionario = []
            for(let z in this.funcionarios){
              for(let w in this.funcionarios[z].CARGO){
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
  getveiculos(){
    this.api.getveiculo().subscribe(res => {this.all_veiculos=res; console.log(res);
    })
  }
  saverel(funcionarios: NgForm){
    let datarel = {}
    datarel["USUARIO"] = 1
    datarel["VEICULO"] = 1
    datarel["FUNCIONARIOS"] = this.formatfunc(funcionarios)
    datarel["OBS"] = this.obs
    datarel["CTE_FPag"] = this.formatcte()
    this.api.saverelatorioentrega(datarel).subscribe(res => [])
  }
  formatfunc(funcionarios: NgForm){
    let _func: Array<any> =[], _obj, funcid = {}
    for (let y in this.cargos) {
      funcid[this.cargos[y]['CARGO']] = this.cargos[y]['id']
    }
    for (let x in funcionarios.value) {
      _obj = { "FUNCAO": funcid[x], "FUNCIONARIO": funcionarios.value[x] }
      _func.push(_obj)
    }
    return _func
  }
  formatcte(){
    let _cte=[], _obj
    for(let x in this.all_cte){
      _obj = { "CTE": this.all_cte[x]["id"], "F_PAGAMENTO": 1 }
      _cte.push(_obj)
    }
    return _cte
  }
  console(){
  }
  /*
{
    "USUARIO": 1,
    "VEICULO": 1,
    "FUNCIONARIOS": [{"FUNCAO": 1, "FUNCIONARIO":3}],
    "OBS": "teste",
    "CTE_FPag": [{"CTE": 999, "F_PAGAMENTO": 1}, {"CTE": 998, "F_PAGAMENTO": 2}, {"CTE": 997, "F_PAGAMENTO": 1}]
}
*/ 
  ngOnInit(): void {
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialogbox.html',
})
export class Dialogbox {

}