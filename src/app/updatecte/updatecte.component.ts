import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ApiService, } from '../api.service';
import { TablectesItem } from '../interfaces.interface'

@Component({
  selector: 'app-updatecte',
  templateUrl: './updatecte.component.html',
  styleUrls: ['./updatecte.component.scss']
})
export class UpdatecteComponent implements OnInit {
  teste = []
  constructor(
    private api : ApiService,
  ) { }
  updatecsv(file: FileList){
    let arq = this.api.csv(file)
    console.log(arq)
    /**for (let x in arq) console.log(arq)
      /*ctedata.DESTINATARIO = arq[x]['Cliente Destinatario']
      ctedata.NFE = arq[x]['']
      ctedata.NR_CONTROLE = arq[x]['CTRC']
      ctedata.NR_DACTE = arq[x]['Chave CTe']
      ctedata.REMETENTE = arq[x]['Cliente Remetente']
      ctedata.VALOR = arq[x]['Valor do Frete']
      ctedata.VOLUMES = arq[x]['']
      console.log(arq[x]['Cliente Destinatario'])
    */
  }
  ngOnInit(): void {
  }
}