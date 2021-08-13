import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Employee, Cargos, JWTPayload, Carg_Func, TablectesItem } from '../interfaces.interface';
import { NgForm } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { AuthService } from '../auth.service';
import { REntregas } from './r-entregas.interface';
import { Router } from "@angular/router"
import { PrintService } from '../print.service';
import validate from "./validator/r-entregas.interface.validator"
import { Card } from '../cards/cards.interface';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

const card: Card = { 
  id: 11, 
  name: "Relatorio", 
  description: "Emicao de relatorios de viagem", 
  url: "../relatorio-entrega", 
  state: true
}


@Component({
  selector: 'app-r-entregas',
  templateUrl: './r-entregas.component.html',
  styleUrls: ['./r-entregas.component.scss']
})
export class REntregasComponent implements OnInit {

  funcionarios: Employee[]
  all_cte: TablectesItem[] = []
  cargos: Cargos[]
  all_cargos: Cargos[]
  selected_cargos = []
  all_veiculos = []
  cte: number
  obs: string =""
  motoristas: Employee[]
  cteid: Array<number> =[]
  ctenf: REntregas['CTE_FPag'] = []
  payment_method_avista: number = 0
  payment_method_praso: number = 0

  selection = new SelectionModel<TablectesItem>(true, []);
  displayedColumns: string[] = ['controle', 'destinatario', 'remetente', 'volumes', 'valor', 'select'];
  
  @ViewChild(MatTable) table: MatTable<TablectesItem>;
  
  constructor(
    private api: ApiService,
    private authService: AuthService,
    private router: Router,
    public printService: PrintService
  ) {
    this.getcargos();
    this.getveiculos();
    this.getpaymentmethod();
  }

  checkboxLabel(row?: TablectesItem): string {
    let objIndex = this.all_cte.findIndex((obj => obj.id == row.id));
    return `${objIndex}`;
    //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


  getCTE(){
    if (this.cte.toString().length == 44 ){
      this.api.getcte("dacte", this.cte).subscribe({
        next: (res: TablectesItem) => {
          res.f_pagamento = this.payment_method_praso
          if (this.cteid.includes(res.id)) {
            window.alert("CTE ja inserido")
            this.cte = null
          } else {
            this.cteid.push(res.id)
            this.all_cte.push(res);
            this.table.renderRows();
            this.cte = null

          }
        },
        error: (error: any) => {
          if (error.status == 404) {
            console.log(error.error);
            var conf = confirm(`${error.error} \n ${error.error["Msg"]} \n Deseja adicionar este DACT mesmo assim? \n Este relatorio ficara desativado para impressao até que este numero de DACT conste no banco de dados`)
            if (conf) {
              var ctenf: TablectesItem = {
                id: 0,
                NR_DACTE: this.cte,
                REMETENTE: "Nao encontrado",
                DESTINATARIO: "Nao encontrado",
                NR_CONTROLE: this.cte.toString().slice(25, 34),
                VALOR: 0,
                VOLUMES: 0,
                NFE: " ",
                f_pagamento: this.payment_method_praso
              }
              this.all_cte.push(ctenf);
              this.table.renderRows();
              this.cte = null
            }else{
              this.cte = null
            }
          }
        }
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
    this.api.get_position().subscribe((res: Cargos[]) => {
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
    this.api.get_employee({}).subscribe((res: Employee[]) => {
      this.funcionarios = res
      this.parseCF();
    })
  }

  getveiculos(){
    this.api.get_car().subscribe(res => {
      this.all_veiculos=res
    })
  }

  getpaymentmethod(){
    this.api.getseting('fpagamento/').subscribe(res => {
      res.forEach(element => {
        if (element.metodo == "A Praso") {
          this.payment_method_praso = element.id
        }
        if (element.metodo == "A Vista") {
          this.payment_method_avista = element.id
        }
      });
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
    if (this.ctenf.length != 0){
      datarel.printable= false
    }
    const getBiped = async () => {
      const data = validate(datarel);
      return data
    }
    
    this.api.saverelatorioentrega(await getBiped()).subscribe(res => {
      if(!datarel.printable){
        this.api.addctenf({rel_id: res["id"], ctes: this.ctenf}).subscribe()
      }
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
      if (element["FUNCAO"] == funcid["Motorista"]) ok = true
    });
    if (ok) { return _func } else {
      window.alert("Selecao de Funcionarios nao permitida, confira")
      throw new Error
    }
  }

  formatcte() {
    let _cte: REntregas['CTE_FPag'] = [], _obj
    if (this.all_cte.length == 0) {
      window.alert("Nenhum DACTe selecionado, imposivel salvar")
      throw new Error
    } else {
      this.all_cte.forEach((dacte: TablectesItem) => {
        if (dacte.id == 0){
          _obj = _obj = { "CTE": dacte.id, "F_PAGAMENTO": dacte.f_pagamento }
          this.ctenf.push(_obj)
        }else{
        _obj = _obj = { "CTE": dacte.id, "F_PAGAMENTO": dacte.f_pagamento }
        _cte.push(_obj)
        }
      });
      return _cte
    }
  }

  payment(data : {index: number, status: boolean}){
    if (data.status) {
      this.all_cte[data.index].f_pagamento = this.payment_method_avista
    } if (!data.status) {
      this.all_cte[data.index].f_pagamento = this.payment_method_praso
    }
    
  }

  console(x?){
    console.log(x);
    //this.api.checknf().subscribe(res => console.log(res))
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