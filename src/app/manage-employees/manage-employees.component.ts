import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Cargos, Cars, Employee } from '../interfaces.interface';

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  employees: Employee[]
  dms_employees: Employee[]
  positions: Cargos[]
  cars: Cars[]

  constructor(
    private api: ApiService
  ) {
    this.api.get_employee({}).subscribe((res: Employee[]) => {this.employees = res})
    this.api.get_position().subscribe((res: Cargos[]) => (this.positions = res))
    this.api.get_car().subscribe((res:Cars[]) => {this.cars = res})
   }
  
   

  add_employee(form:NgForm){
    let data: Employee = {
    NOME : form.value.name,
    SOBRENOME : form.value.surname,
    CARGO : form.value.position,
    SITUACAO : true
    }
    this.api.add_edit_employee(data, false).subscribe((res: Employee) => {
      
      form.resetForm()
    })
  }

  edit_employee(form:NgForm){
    let data: Employee
    this.api.add_edit_employee(data, true).subscribe((res: Employee) => {})
  }

  add_car(form:NgForm){
    let data: Cars
    this.api.add_edit_car(data, false).subscribe((res: Cars) => {})
  }

  edit_car(form:NgForm){
    let data: Cars
    this.api.add_edit_car(data, true).subscribe((res: Cars) => {})

  }

  add_position(from:NgForm){
    let data: Cargos
    this.api.add_position(data).subscribe((res: Cargos) => {})

  }

  ngOnInit(): void {
  }

}
