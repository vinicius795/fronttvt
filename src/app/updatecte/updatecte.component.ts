import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-updatecte',
  templateUrl: './updatecte.component.html',
  styleUrls: ['./updatecte.component.scss']
})
export class UpdatecteComponent implements OnInit {

  constructor(
    private apiservice : ApiService
  ) { }

  ngOnInit(): void {
    this.apiservice.getfunc({cargo:"motorista", id:3}).subscribe(res => console.log(res))
  }

}
