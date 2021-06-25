import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { ResRel, SysParameters, TablectesItem } from '../interfaces.interface'

@Component({
  selector: 'app-print-r-entregas',
  templateUrl: './print-r-entregas.component.html',
  styleUrls: ['./print-r-entregas.component.scss']
})
export class PrintREntregasComponent implements OnInit {
  invoiceIds: Number
  report: ResRel
  aviso: String
  ctelist: TablectesItem[] = []
  displayedColumns: string[] = ['controle', 'destinatario', 'remetente', 'volumes', 'valor'];

  constructor(
    route: ActivatedRoute,
    private api: ApiService
    ) {
    this.invoiceIds = route.snapshot.params['invoiceIds'];
  }
  getInfRela(id: Number) {
    this.api.getrelatorioentrega(id).subscribe((res: ResRel) => {
      this.report = res
      this.report.CTE_FPag.forEach(element => {
        this.ctelist.push(element.CTE);
      })
      this.api.getseting("aviso-rel-entregas").subscribe((res: SysParameters) => {
        this.aviso = res.valor;/* setTimeout(window.print) */
      })
    })
  }
  ngOnInit() {
    this.getInfRela(this.invoiceIds)
  }
}
