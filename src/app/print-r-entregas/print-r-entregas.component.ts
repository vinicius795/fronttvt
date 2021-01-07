import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { PrintService } from '../print.service';

@Component({
  selector: 'app-print-r-entregas',
  templateUrl: './print-r-entregas.component.html',
  styleUrls: ['./print-r-entregas.component.scss']
})
export class PrintREntregasComponent implements OnInit {
  invoiceIds: string[];
  invoiceDetails: Promise<any>[];
  report: any;
  report2: Promise<any>[];

  constructor(route: ActivatedRoute,
    private api: ApiService,
    private printService: PrintService) {
    this.invoiceIds = route.snapshot.params['invoiceIds']
      .split(',');
  }

  ngOnInit() {
    /*this.invoiceDetails = this.invoiceIds
      .map(id => this.getInvoiceDetails(id));
    Promise.all(this.invoiceDetails)
      .then();*/
    this.report2 = this.invoiceIds
    .map(id => this.getInfRela(id));
    Promise.all(this.report2).then()

  }
  getInfRela(id){
    return new Promise(resolve =>
      setTimeout(() => resolve(
        this.api.getrelatorioentrega(id).subscribe(res => this.report = res)
        )
      )
    )
  }

  getInvoiceDetails(invoiceId) {
    const amount = Math.floor((Math.random() * 100));
    return new Promise(resolve =>
      setTimeout(() => resolve({ amount }), 1000)
    );
  }

}