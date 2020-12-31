import { AfterViewInit, Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TablectesItem } from '../interfaces.interface';
import { TablectesDataSource,  } from './tablectes-datasource';

@Component({
  selector: 'app-tablectes',
  templateUrl: './tablectes.component.html',
  styleUrls: ['./tablectes.component.scss']
})
export class TablectesComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TablectesItem>;
  dataSource: TablectesDataSource;

  @Input() all_cte: []

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['REMETENTE', 'DESTINATARIO', 'NR_CONTROLE'];

  ngOnInit() {
    this.dataSource = new TablectesDataSource();
    this.dataSource.data = this.all_cte
  }
  ngOnChanges(){
    this.dataSource = new TablectesDataSource();
    this.dataSource.data = this.all_cte
  }

  ngAfterViewInit() {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

  }
}
