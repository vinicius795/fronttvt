import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  new_u_form =  new FormGroup({
    username: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    password: new FormControl(),
    is_staff: new FormControl(),
  })

  constructor(
    private api: ApiService
  ) { }
  save(){
    console.log(this.new_u_form.value);
    this.api.create_user(this.new_u_form.value).subscribe(res => {
      this.new_u_form.reset()
    })
  }

  ngOnInit(): void {
  }

}
