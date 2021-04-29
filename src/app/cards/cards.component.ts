import { Component, OnInit } from '@angular/core';
import { card } from "./cards.interface"
import { cardlist} from '../mocks/cards'
import { from, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ApiService } from '../api.service'
import { UpdatecteService } from '../updatecte.service';
import { SystemSetings } from '../interfaces.interface'

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit {

  _cardlist = cardlist;
  cardbase: card;
  lastupdatesp: SystemSetings;
  lastupdatessw: SystemSetings;
  _progress: number = 0;

  ismobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private apiservice: ApiService,
    private UpdateCTE: UpdatecteService,
    ) { }

  ngOnInit(): void {
    this.getlastsincsp()
    this.getlastsincssw()
  }
  sincsp(): void{
    this.apiservice.sincsp().subscribe(res => { if (res == null) this.getlastsincsp()});
  }
  sincssw(fileList: FileList){
    let _ctenow = 0
    this.UpdateCTE.updatecsv(fileList).then((data: any[]) => {
      data.forEach((element) => {
        this.apiservice.addcte(element).subscribe((res) => {
          _ctenow = _ctenow + 1
          this._progress = (_ctenow/data.length)*100
        })
      });
      this.getlastsincssw()

    });
  }
  getlastsincsp(): void{
    this.apiservice.getseting("lastsincsp").subscribe(res => { this.lastupdatesp = res });
  }
  getlastsincssw(): void {
    this.apiservice.getseting("lastsincssw").subscribe(res => { this.lastupdatessw = res });
  }
}
