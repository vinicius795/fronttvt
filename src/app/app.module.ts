import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { NavbarComponent } from './navbar/navbar.component';
import { SelectmotoristaComponent } from './selectmotorista/selectmotorista.component';
import { SelectajudanteComponent } from './selectajudante/selectajudante.component';
import { SelectveiculoComponent } from './selectveiculo/selectveiculo.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SelectmotoristaComponent,
    SelectajudanteComponent,
    SelectveiculoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
