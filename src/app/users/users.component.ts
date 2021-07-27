import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { take } from 'rxjs/operators';

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
  notice_form = new FormGroup({
    valor: new FormControl()
  })


  constructor(
    private api: ApiService,
    private _ngZone: NgZone
  ) {
    this.get_users()
    this.get_setting()
   }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
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
  save_term(){
    this.api.getseting("aviso-rel-entregas", true, this.notice_form.value).subscribe(res => {
      console.log(res);
      
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
  get_setting(){
    this.api.getseting("aviso-rel-entregas").subscribe(res => {
      this.notice_form.setValue({
        valor: res.valor
      })
    })
  }
  ngOnInit(): void {
  }

}
