import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  is_super: Boolean = false
    new_u_form =  new FormGroup({
    username: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    password: new FormControl(),
    is_staff: new FormControl(),
  })

  constructor(
    private api: ApiService
  ) {
    this.get_users()
   }
  save(){
    
    if (this.new_u_form.value.is_staff == null){
      this.new_u_form.value.is_staff = false
    }
    console.log(this.new_u_form.value);
    this.api.create_user(this.new_u_form.value).subscribe(res => {
      window.alert(`Usuario ${res['username']} criado`)
      this.new_u_form.reset()
    })
  }
  get_users(){
    this.api.get_users().subscribe(res => {
      
      this.is_super = true
    },
    error => {
      if(error.status == 403){
        this.is_super = false
      }
      
    })
  }

  ngOnInit(): void {
  }

}
