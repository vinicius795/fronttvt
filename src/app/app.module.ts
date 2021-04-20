//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

//components
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { CardsComponent } from './cards/cards.component';
import { NavigationComponent } from './navigation/navigation.component';
import { REntregasComponent } from './r-entregas/r-entregas.component';
import { UpdatecteComponent } from './updatecte/updatecte.component';

//pwa
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TablectesComponent } from './tablectes/tablectes.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PrintREntregasComponent } from './print-r-entregas/print-r-entregas.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService, AuthInterceptor, AuthGuard } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CardsComponent,
    MediaQueryStatusComponent,
    EtiquetaComponent,
    REntregasComponent,
    UpdatecteComponent,
    TablectesComponent,
    PrintLayoutComponent,
    PrintREntregasComponent,
    LoginComponent,
    LogoutComponent,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    NgxCsvParserModule,
    MatProgressBarModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
