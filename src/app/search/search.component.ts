import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Card } from '../cards/cards.interface';

const card: Card = {
  id: 10,
  description: "Buscar cte, nota fiscal, relatorio por data",
  name: "Buscar",
  state: true,
  url: "../search"
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  data: any
  constructor(
    private api: ApiService
  ) { }
  search($event, value: string){
    if($event.keyCode == 13 || $event.type=="click") {
      this.api.search(value).subscribe(res => {this.data = res})
  }
    
    
  }

  ngOnInit(): void {
  }

}
