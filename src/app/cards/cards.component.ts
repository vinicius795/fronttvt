import { Component, OnInit } from '@angular/core';
import { Card } from "./cards.interface"
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
  cardbase: Card;
  lastupdatesp: SystemSetings;
  lastupdatessw: SystemSetings;
  _progress: number = 0;
  filename: String = ""
  showprogress: boolean = false
  report_l_today: any
  ctes_n_listed: Number = 10
  report_n_closed: Number = 5

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
    this.apiservice.get_report_today().subscribe(res => {this.report_l_today = res})
  }
  sincsp(): void{
    this.apiservice.sincsp().subscribe(res => { if (res == null) this.getlastsincsp()});
  }
  sincssw(fileList: FileList){
    let _ctenow = 0
    this.UpdateCTE.updatecsv(fileList).then((data: any[]) => {
      let strdata = data[1], patter = /[0-3][0-9][/][0-1][0-9][/][0-9][0-9]/g
      let periodo = (_datearay = strdata.match(patter)) => {
        return `Conhecimentos emitidos de ${_datearay[0]} a ${_datearay[1]}`
      }
      this.filename = periodo();
      this.showprogress = true
      data[0].forEach((element) => {
        this.apiservice.addcte(element).subscribe((res) => {
          _ctenow = _ctenow + 1
          this._progress = (_ctenow/data.length)*100
        })
      })
      this.getlastsincssw()
      this.showprogress = false
    });
    
  }
  getlastsincsp(): void{
    this.apiservice.getseting("lastsincsp").subscribe(res => { this.lastupdatesp = res });
  }
  getlastsincssw(): void {
    this.apiservice.getseting("lastsincssw").subscribe(res => { this.lastupdatessw = res });
  }
}