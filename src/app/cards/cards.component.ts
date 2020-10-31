import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { card } from "./cards.interface"
import { cardlist } from '../mocks/cards'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  

  _cardlist = cardlist;
  cardbase: card;

  constructor() { }

  ngOnInit(): void {
  }

}

