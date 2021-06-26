import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Card } from '../cards/cards.interface';
import { TablectesItem, ResRel } from '../interfaces.interface';

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
  cte_list: Array<ctelist> = []
  res_is_rel: boolean = true
  constructor(
    private api: ApiService
  ) { }
  search($event, value: string){
    if($event.keyCode == 13 || $event.type=="click") {
      this.api.search(value).subscribe((res: any) => {
        if('rel' in res){
          this.shownfe(res)
        }else{
          this.listrel(res)
        }

      })
    }
  }
  listrel(res) {
    this.cte_list = []
    let list: [ResRel]
    list = res
    list.forEach(each_rel => {
      each_rel.CTE_FPag.forEach(element => {
        this.cte_list.push({
          url: `/print/invoice/${each_rel.id}`,
          cte: element.CTE
        })
      });
    });
  }
  shownfe(res) {
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

class ctelist {
  url: string
  cte: TablectesItem
}