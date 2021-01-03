import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-print-r-entregas',
  templateUrl: './print-r-entregas.component.html',
  styleUrls: ['./print-r-entregas.component.scss']
})
export class PrintREntregasComponent implements OnInit {
  invoiceIds: string[];

  constructor(route: ActivatedRoute) {
    this.invoiceIds = route.snapshot.params['invoiceIds']
      .split(',');
  }

  ngOnInit(): void {
  }

}
