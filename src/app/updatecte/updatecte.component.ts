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
    //private api : ApiService,
    private newcte: AddCTe
  ) { }
  updatecsv(file: FileList){
  }
  ngOnInit(): void {
  }
}