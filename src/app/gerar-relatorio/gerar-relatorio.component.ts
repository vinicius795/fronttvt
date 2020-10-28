import { Component, OnInit } from '@angular/core';
import { funcionario } from  "../funcionario"
import { mockFuncionarios } from "../gerar-relatorio/mock/mockfuncionario"

@Component({
  selector: 'app-gerar-relatorio',
  templateUrl: './gerar-relatorio.component.html',
  styleUrls: ['./gerar-relatorio.component.sass']
})
export class GerarRelatorioComponent implements OnInit {

  funcionarios = mockFuncionarios;
  selectedfuncionario: funcionario;

  constructor() {}

  ngOnInit(): void {
  }
  onSelect(Funcinario: funcionario): void {
    
    if (Funcinario.cargo == 'motorista'){
      console.log(Funcinario.cargo);
      this.selectedfuncionario = Funcinario;
    }
  }

}
