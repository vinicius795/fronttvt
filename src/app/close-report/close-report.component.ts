import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { JWTPayload } from '../interfaces.interface';


@Component({
  selector: 'app-close-report',
  templateUrl: './close-report.component.html',
  styleUrls: ['./close-report.component.scss']
})
export class CloseReportComponent implements OnInit {
  n_relatorio: number
  payload = <JWTPayload>jwtDecode(this.authService.token);
  d = new Date();
  return: any
  loading: boolean = false
  form: {
    who_close: Number,
    date_closed: any
  }

  constructor(
    private authService: AuthService,
    private apiservice: ApiService,
  ) {
  }

  closereport($event, value: number){
    
    if($event.keyCode == 13 || $event.type=="click") {
      this.return = ""
      this.loading = true
      this.form = {
        who_close: this.payload.user_id,
        date_closed: this.d
      }
      this.apiservice.close_report(value, this.form).subscribe(res =>{
        this.loading=false
        this.return=res
      })
    }
  }

  ngOnInit(
  ): void {
  }


}
