import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, } from '../api.service';
import { TablectesItem } from '../interfaces.interface';
import { UpdatecteService } from '../updatecte.service';


@Component({
  selector: 'app-updatecte',
  templateUrl: './updatecte.component.html',
  styleUrls: ['./updatecte.component.scss']
})

export class UpdatecteComponent implements OnInit {
  cte_form = new FormGroup({
    n_cte: new FormControl(),
    sender: new FormControl(),
    receiver: new FormControl(),
    n_control: new FormControl(),
    price: new FormControl(),
    volumes: new FormControl(),
    nfe: new FormControl(),
  })

  constructor(
    private Api:ApiService,
  ) { }
  save(){
    let data: TablectesItem = ({
      DESTINATARIO : this.cte_form.value.receiver,
      NFE : this.cte_form.value.nfe,
      NR_CONTROLE : this.cte_form.value.n_control,
      NR_DACTE : this.cte_form.value.n_cte,
      REMETENTE : this.cte_form.value.sender,
      VALOR : this.cte_form.value.price,
      VOLUMES : this.cte_form.value.volumes
    })
    this.Api.addcte(data).subscribe(res =>{
      this.cte_form.reset()
      window.alert("Conhecimento gravado")
    })
  }
  ngOnInit(): void {
  }
}
