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
      this.api.search(value).subscribe(res => {
        if("rel" in res){
          this.shownfe(res)
        }else{
          this.listrel(res)
        }
      })
    }
  }
  listrel(res: Object) {
    throw new Error('Method not implemented.');
  }
  shownfe(res: Object) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'show-list-rel',
  templateUrl: './show-list-rel.html'
})
export class ShowListRel{

  constructor(

  ){}
}
