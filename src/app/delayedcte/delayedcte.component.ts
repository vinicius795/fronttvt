import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ApiService } from '../api.service';
import { TablectesItem } from '../interfaces.interface';


@Component({
  selector: 'app-delayedcte',
  templateUrl: './delayedcte.component.html',
  styleUrls: ['./delayedcte.component.scss']
})
export class DelayedcteComponent implements OnInit {

  ctelist: TablectesItem[] = []
  displayedColumns: string[] = ['NR_CONTROLE', "REMETENTE", 'DESTINATARIO', 'NFE'];
  dataSource = [...this.ctelist];

  @ViewChild(MatTable) table: MatTable<TablectesItem>;

  constructor(
    private apiservice: ApiService,
  ) { }

  ngOnInit(): void {
    this.apiservice.standard_get("missing/delayed").subscribe((res:TablectesItem[]) => {
      res.forEach((element: TablectesItem) => {
        this.dataSource.push(element);
      });
      
      this.table.renderRows();
    })
    
  }

}
