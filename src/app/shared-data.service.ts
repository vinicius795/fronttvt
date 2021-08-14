import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Card } from './cards/cards.interface';
import { Utilit } from './interfaces.interface';


@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  cards: Card[] = []
  col_rel: String[] = []
  utilits: Utilit[] = []

  constructor(
    private api : ApiService
  ) { }
  
}
