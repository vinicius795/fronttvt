import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Funcionario, Cargos, JWTPayload, Carg_Func } from '../interfaces.interface';
import { NgForm } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-r-entregas',
  templateUrl: './r-entregas.component.html',
  styleUrls: ['./r-entregas.component.scss']
})
export class REntregasComponent implements OnInit {

  funcionarios: Funcionario[]
  all_cte = []
  cargos: Cargos[]
  all_cargos: Cargos
  selected_cargos = []
  all_veiculos = []
  cte: number
  obs: string =""
  motoristas: Funcionario[]

  constructor(
    private api: ApiService,
    private authService: AuthService
  ) {
    this.getcargos();
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

  private parseCF() {
    
    let parsedata: Carg_Func

    this.all_cargos.forEach(item => {
      parsedata = { ...parsedata, [item.CARGO]: [] }
    });

    this.funcionarios.forEach(funcionario => {
      funcionario.CARGO.forEach(item => {
        parsedata[item.CARGO].push(funcionario)
      });
    });

    this.motoristas = parsedata.Motorista;

  }

  getcargos(){
    this.api.getcargos().subscribe((res: Cargos) => {
      let showcargos: Cargos[] = res.slice()
      res.forEach((element: Cargos)=> {
        if (!element.SHOW_RELATORIO || element.CARGO == "Motorista")  showcargos.splice(showcargos.indexOf(element), 1);
      })
      this.all_cargos = res
      //console.log(JSON.stringify(res));
      
      this.cargos = showcargos
      this.getfunc()
    })
    
  }

  getfunc(){
    this.api.getfunc({}).subscribe(res => {
      this.funcionarios = res
      //console.log(JSON.stringify(res))
      this.parseCF();
    })
  }

  getveiculos(){
    this.api.getveiculo().subscribe(res => {
      this.all_veiculos=res
    })
  }

  saverel(funcionarios: NgForm){
    //console.log(funcionarios.value);
    
    let datarel = {}
    const payload = <JWTPayload>jwtDecode(this.authService.token);
    let veiculo = funcionarios.value.veiculos
    delete funcionarios.value.veiculos
    datarel["USUARIO"] = payload.user_id
    datarel["VEICULO"] = veiculo
    datarel["FUNCIONARIOS"] = this.formatfunc(funcionarios)
    datarel["OBS"] = this.obs
    datarel["CTE_FPag"] = this.formatcte()
    //console.log(datarel);
    
    this.api.saverelatorioentrega(datarel).subscribe(res => {console.log(res);})
    
    
  }

  formatfunc(funcionarios: NgForm){
    let _func: Array<any> =[], _obj, funcid = {}
    for (let y in this.all_cargos) {
      funcid[this.all_cargos[y]['CARGO']] = this.all_cargos[y]['id']
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