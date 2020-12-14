import { Component, OnInit } from '@angular/core';
import { ApiService, AddCTe} from '../api.service'

@Component({
  selector: 'app-updatecte',
  templateUrl: './updatecte.component.html',
  styleUrls: ['./updatecte.component.scss']
})
export class UpdatecteComponent implements OnInit {
  teste: any
  constructor(
    private apiservice : ApiService, 
    private addcte : AddCTe
  ) { }
  updatecsv(file: FileList){
    console.log(this.addcte.csv(file))
  }
  ngOnInit(): void {
  }
}