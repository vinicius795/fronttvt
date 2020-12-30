//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//addins
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediaQueryStatusComponent } from './cards/media-query-status.component';

//material 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

//components
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { CardsComponent } from './cards/cards.component';
import { NavigationComponent } from './navigation/navigation.component';
import { REntregasComponent } from './r-entregas/r-entregas.component';
import { UpdatecteComponent } from './updatecte/updatecte.component';

//pwa
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CardsComponent,
    MediaQueryStatusComponent,
    EtiquetaComponent,
    REntregasComponent,
    UpdatecteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
