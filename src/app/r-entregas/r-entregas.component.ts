import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Funcionario, Cargos, JWTPayload, Carg_Func } from '../interfaces.interface';
import { NgForm } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';
import { REntregas } from './r-entregas.interface';
import { Router } from "@angular/router"
import { PrintService } from '../print.service';
import validate from "./validator/r-entregas.interface.validator"

@Component({
  selector: 'app-r-entregas',
  templateUrl: './r-entregas.component.html',
  styleUrls: ['./r-entregas.component.scss']
})
export class REntregasComponent implements OnInit {

  funcionarios: Funcionario[]
  all_cte = []
  cargos: Cargos[]
  all_cargos: Cargos[]
  selected_cargos = []
  all_veiculos = []
  cte: number
  obs: string =""
  motoristas: Funcionario[]

  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    public printService: PrintService
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
    this.api.getcargos().subscribe((res: Cargos[]) => {
      let showcargos: Cargos[] = res.slice()
      res.forEach((element: Cargos)=> {
        if (!element.SHOW_RELATORIO || element.CARGO == "Motorista")  showcargos.splice(showcargos.indexOf(element), 1);
      })
      this.all_cargos = res
      this.cargos = showcargos
      this.getfunc()
    })
    
  }

  getfunc(){
    this.api.getfunc({}).subscribe((res: Funcionario[]) => {
      this.funcionarios = res
      this.parseCF();
    })
  }

  getveiculos(){
    this.api.getveiculo().subscribe(res => {
      this.all_veiculos=res
    })
  }

  async saverel(funcionarios: NgForm) {
    const payload = <JWTPayload>jwtDecode(this.authService.token);
    const veiculo = () => { 
      let veiculo: string
      try {
        veiculo = funcionarios.value.veiculos
        delete funcionarios.value.veiculos
        return JSON.parse(veiculo)
      } catch (error) {
        console.log(error);
        return ""
      }
    }
    let datarel: REntregas = {
      USUARIO: payload.user_id,
      VEICULO: veiculo(),
      FUNCIONARIOS: this.formatfunc(funcionarios),
      OBS: this.obs,
      CTE_FPag: this.formatcte()
    }
    const getBiped = async () => {
      const data = validate(datarel);
      return data
    }
    this.api.saverelatorioentrega(await getBiped()).subscribe(res => {
      // this.router.navigate([`/print/invoice/${res["id"]}`])  
      // this.printService.printDocument('invoice', res["id"]);
      this.openInNewTab(this.router, `print/invoice/${res["id"]}`)
    })

  }

  private openInNewTab(router: Router, namedRoute) {
    let newRelativeUrl = router.createUrlTree([namedRoute]);
    let baseUrl = window.location.href.replace(router.url, '');
    window.open(baseUrl + newRelativeUrl, '_blank');
  }

  formatfunc(funcionarios: NgForm) {
    let _func: REntregas['FUNCIONARIOS'] = [], _obj, funcid = {}
    for (let y in this.all_cargos) {
      funcid[this.all_cargos[y]['CARGO']] = this.all_cargos[y]['id']
    }
    for (let x in funcionarios.value) {
      try {
        _obj = { "FUNCAO": funcid[x], "FUNCIONARIO": JSON.parse(funcionarios.value[x]) }
        _func.push(_obj)
      } catch (error) {
        window.alert("Selecao de Funcionarios nao permitida, confira")
        throw new Error
      }
    }
    let ok: boolean = false;
    _func.forEach((element) => {
      if (element["FUNCAO"] == 3) ok = true
    });
    if (ok) { return _func } else {
      window.alert("Selecao de Funcionarios nao permitida, confira")
      throw new Error
    }
  }

  formatcte(){
    let _cte: REntregas['CTE_FPag'] = [], _obj
    for(let x in this.all_cte){
      _obj = { "CTE": this.all_cte[x]["id"], "F_PAGAMENTO": 1 }
      _cte.push(_obj)
    }
    if (_cte.length == 0){
      window.alert("Nenhum DACTe selecionado, imposivel salvar")
      throw new Error
    }else return _cte
  }

  console(funcionarios?: NgForm){
    try {
      let veiculo: number = funcionarios.value.veiculos
    } catch (e) {
      if (e instanceof TypeError){
      console.log(e);
      }
      
      
    }
  }

  ngOnInit(): void {
    
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialogbox.html',
})
export class Dialogbox {

}