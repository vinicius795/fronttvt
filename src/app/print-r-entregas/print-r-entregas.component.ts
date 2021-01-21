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
  reldate: any
  aviso: any 

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
    this.api.getseting("aviso-rel-entregas").subscribe(res => this.aviso = res)

  }
  getInfRela(id){
    return new Promise(resolve =>
      setTimeout(() => resolve(
        this.api.getrelatorioentrega(id).subscribe(res => {this.report = res, this.reldate = Date.parse(res.DATA)})
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
/*
{
  "id": 30,
    "USUARIO": {
    "id": 1,
      "username": "vinicius"
  },
  "VEICULO": {
    "id": 1,
      "REFERENCIA": "Teste",
        "MODELO": "VOLVO",
          "PLACA": "ABC-1234"
  },
  "FUNCIONARIOS": [
    {
      "id": 3,
      "NOME": "Teste",
      "SOBRENOME": "1",
      "CARGO": [
        {
          "id": 1,
          "CARGO": "Motorista"
        }
      ],
      "USUARIO": null,
      "SITUACAO": true
    },
    {
      "id": 5,
      "NOME": "Teste",
      "SOBRENOME": "3",
      "CARGO": [
        {
          "id": 1,
          "CARGO": "Motorista"
        },
        {
          "id": 2,
          "CARGO": "Ajudante"
        }
      ],
      "USUARIO": null,
      "SITUACAO": true
    }
  ],
    "OBS": "teste",
      "DATA": "2021-01-03T03:23:58.118794Z",
        "CTE_FPag": [
          {
            "CTE": {
              "id": 999,
              "NR_DACTE": "35200544433407000188570010006623781016463570",
              "REMETENTE": "RGR CONEXOES IND  E COM  LTDA      ",
              "DESTINATARIO": "NOMA DO BRASIL SOCIEDADE ANONIMA   ",
              "NR_CONTROLE": "646357",
              "VALOR": "43.10",
              "VOLUMES": "2",
              "NFE": "00078084/                          "
            },
            "F_PAGAMENTO": {
              "id": 1,
              "metodo": "A vista"
            }
          },
          {
            "CTE": {
              "id": 998,
              "NR_DACTE": "35200544433407000188570010006623771016463557",
              "REMETENTE": "INOVAPEL COMERCIAL TEXTIL LTDA     ",
              "DESTINATARIO": "ACESSORIOS P/ AUTOS FIM DA PICADA L",
              "NR_CONTROLE": "646355",
              "VALOR": "197.93",
              "VOLUMES": "5",
              "NFE": "00007744/                          "
            },
            "F_PAGAMENTO": {
              "id": 1,
              "metodo": "A vista"
            }
          },
          {
            "CTE": {
              "id": 997,
              "NR_DACTE": "35200544433407000188570010006623761016463339",
              "REMETENTE": "FARMABRAS IND DE APAR MEDIC LTDA   ",
              "DESTINATARIO": "PEF COMERCIAL BRANDAO - EIRELI - ME",
              "NR_CONTROLE": "646333",
              "VALOR": "51.27",
              "VOLUMES": "1",
              "NFE": "00143169/                          "
            },
            "F_PAGAMENTO": {
              "id": 1,
              "metodo": "A vista"
            }
          }
        ]
}*/