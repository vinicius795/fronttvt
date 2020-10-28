import { Component, OnInit } from '@angular/core';
import { sqlite3 } from 'sqlite3'

let db = new sqlite3.Database('D:/Users/Vinicius P/Documents/sistematvt/sistematvt/TvT/db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }

});

@Component({
  selector: 'app-selectveiculo',
  templateUrl: './selectveiculo.component.html',
  styleUrls: ['./selectveiculo.component.sass']
})
export class SelectveiculoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
