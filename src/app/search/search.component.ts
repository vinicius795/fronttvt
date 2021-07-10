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
  
  res_rel: any
  res_is_rel: boolean = false
  res_is_any: boolean = false
  res_any: any
  constructor(
    private api: ApiService
  ) { }
  search($event, value: string){
    if($event.keyCode == 13 || $event.type=="click") {
      this.api.search(value).subscribe(res => {
        
        if(res[0]["rel"] === undefined ){
          this.res_is_any = false
          this.res_rel = res
          this.res_is_rel = true
        }else{
          this.res_is_rel = false
          this.res_any = res
          this.res_is_any = true
        }

      })
    }
  }
/*   listrel(res) {
    this.cte_list = []
    let list: [ResRel] = res
    console.log(res);
    
    list.forEach(each_rel => {
      each_rel.CTE_FPag.forEach(element => {
        this.cte_list.push({
          url: `/print/invoice/${each_rel.id}`,
          remetente: element.CTE.REMETENTE,
        })
      });
    });
  } */
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

class rellist{

}

class ctelist {
  url: string
  cte: TablectesItem
}