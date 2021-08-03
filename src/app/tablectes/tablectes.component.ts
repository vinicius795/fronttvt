import { Component, ViewChild, Input, OnChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TablectesItem } from '../interfaces.interface';
import { TablectesDataSource } from './tablectes-datasource';

@Component({
  selector: 'app-tablectes',
  templateUrl: './tablectes.component.html',
  styleUrls: ['./tablectes.component.scss']
})
export class TablectesComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TablectesItem>;
  dataSource: TablectesDataSource;

  @Input() dados: Array<TablectesItem>
  @Input() teste: number


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['NR_CONTROLE', 'REMETENTE', 'DESTINATARIO', 'VALOR'];

  ngOnChanges(){
    this.dataSource = new TablectesDataSource();
    this.dataSource.data = this.dados
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
