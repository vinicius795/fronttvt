import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Cargos, Cars, Funcionario } from '../interfaces.interface';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  employees: Funcionario[]
  dms_employees: Funcionario[]
  position: Cargos[]
  cars: Cars[]

  constructor(
    private api: ApiService
  ) {
    this.api.getfunc({}).subscribe((res: Funcionario[]) => {this.employees = res})
    this.api.getcargos().subscribe((res: Cargos[]) => (this.position = res))
    this.api.getveiculo().subscribe((res:Cars[]) => {this.cars = res})
   }

  add_employee(data:NgForm){
    this.api.add_edit_employee(data).subscribe((res: Funcionario) => {})
  }

  edit_employee(data:NgForm){
    this.api.add_edit_employee()
  }

  add_car(data:NgForm){

  }

  edit_car(data:NgForm){

  }

  add_positio(data:NgForm){

  }
  ngOnInit(): void {
  }

}
