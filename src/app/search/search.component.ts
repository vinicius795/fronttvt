import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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
