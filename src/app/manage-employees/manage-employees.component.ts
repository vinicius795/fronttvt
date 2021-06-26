import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ApiService } from '../api.service';
import { Card } from '../cards/cards.interface';
import { Cargos, Cars, Employee } from '../interfaces.interface';

const card: Card = { 
  id: 4, 
  name: "Gerenciar Funcionarios", 
  description: "Adiciona/ Gerencia Funcionarios, Caminhoes e Cargo", 
  url: "../editfunc", 
  state: true 
}

@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.scss']
})
export class ManageEmployeesComponent implements OnInit {

  employees: Employee[]
  dms_employees: Employee[]
  selected_emp: number
  positions: Cargos[]
  cars: Cars[]
  selected_car: number
  checked = true;

  constructor(
    private api: ApiService
  ) {
    this.get_employees()
    this.get_position()
    this.get_car()
   }
  
  get_employees(){
    this.api.get_employee({}).subscribe((res: Employee[]) => { this.employees = res })
  }
  
  get_position(){
    this.api.get_position().subscribe((res: Cargos[]) => (this.positions = res))
  }

  get_car(){
    this.api.get_car().subscribe((res: Cars[]) => { this.cars = res })
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
      this.get_employees()
    })
  }

  fill_edit_emp_form($event, form:NgForm){
    
    if ($event){
      let employee: Employee
      let position : Array<Number> =[]
      this.employees.forEach(emp => {
        if (emp.id == $event) {
          employee = emp
          emp.CARGO.forEach(pos => {
            position.push(pos.id)
          });
        }

      });
      form.setValue({
        name: employee.NOME,
        surname: employee.SOBRENOME,
        position: position,
        status: employee.SITUACAO,
        edit_em_select: "",
      })
    }
    
  }

  edit_employee(form:NgForm){
    let data: Employee = {
      NOME: form.value.name,
      SOBRENOME: form.value.surname,
      CARGO: form.value.position,
      SITUACAO: form.value.status,
    }
    this.api.add_edit_employee(data, true, this.selected_emp).subscribe((res: Employee) => {
      this.get_employees()
      form.resetForm()
    })
  }

  add_car(form:NgForm){
    let data: Cars = {
      MODELO: form.value.model,
      PLACA: form.value.plate,
      REFERENCIA: form.value.ref,
      status: true,
    }
    this.api.add_edit_car(data, false).subscribe((res: Cars) => {
      form.resetForm();
      this.get_car()
    })
  }

  edit_car(form:NgForm){
    let data: Cars = {
      MODELO: form.value.model,
      PLACA: form.value.plate,
      REFERENCIA: form.value.ref,
      status: form.value.status,
    }
    this.api.add_edit_car(data, true, this.selected_car).subscribe((res: Cars) => {
      this.get_car()
      form.resetForm()
    })
  }

  fill_edit_car($event, form:NgForm){
    if($event){
      let car: Cars
      this.cars.forEach($car => {
        if($car.id == this.selected_car) car=$car
      });
      form.setValue({
        model: car.MODELO,
        plate: car.PLACA,
        ref: car.REFERENCIA,
        status: car.status,
        edit_car_select: "",
      })
    }
  }

  add_position(form:NgForm){
    let data: Cargos = {
      CARGO: form.value.position,
      SHOW_RELATORIO: form.value.show,
    }
    this.api.add_position(data).subscribe((res: Cargos) => {
      this.get_position()
    })

  }

  ngOnInit(): void {
  }

}
