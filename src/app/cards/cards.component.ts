import { Component, OnInit } from '@angular/core';
import { card, Parametro } from "./cards.interface"
import { cardlist} from '../mocks/cards'
import { from, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {
  _cardlist = cardlist;
  cardbase: card;
  _parametro: Parametro;

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
    this.apiservice.getparametro("lastsincsp").subscribe(res => {this._parametro = res});
  }
}
