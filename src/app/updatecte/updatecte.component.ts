import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ApiService, } from '../api.service';
import { TablectesItem } from '../interfaces.interface';
import { UpdatecteService } from '../updatecte.service';


@Component({
  selector: 'app-updatecte',
  templateUrl: './updatecte.component.html',
  styleUrls: ['./updatecte.component.scss']
})

export class UpdatecteComponent implements OnInit {

  _totctes: number;
  _ctenow: number;


  constructor(
    private Api:ApiService,
    private UpdateCTE: UpdatecteService,
  ) { }
  updatecsv(fileList: FileList){
    this.UpdateCTE.updatecsv(fileList).then((data: any[])=>{
        this._totctes =  data.length
        data.forEach((element) => {
          this.Api.addcte(element).subscribe((res) => {
            this._ctenow = this._ctenow+1
          })
        });
      });
    }
  ngOnInit(): void {
  }
}
