import { Component, OnInit } from '@angular/core';
import { card } from "./cards.interface"
import { cardlist} from '../mocks/cards'
import { from, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiService, SystemSetings } from '../api.service'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

  _cardlist = cardlist;
  cardbase: card;
  lastupdatesp: SystemSetings;
  teste: any;

  ismobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiservice: ApiService,
    ) { }

  ngOnInit(): void {
    this.getlastsincsp()
  }
  sincsp(): void{
    this.apiservice.sincsp().subscribe(res => { if (res == null) this.getlastsincsp()});
  }
  
  getlastsincsp(): void{
    this.apiservice.getseting("lastsincsp").subscribe(res => { this.lastupdatesp = res });
  }
}
