import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//modules
import { REntregasComponent} from './r-entregas/r-entregas.component'
import { CardsComponent} from './cards/cards.component'
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { UpdatecteComponent } from "./updatecte/updatecte.component"
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PrintREntregasComponent } from './print-r-entregas/print-r-entregas.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.service';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { DelayedcteComponent } from './delayedcte/delayedcte.component';
import { CloseReportComponent } from './close-report/close-report.component';


const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    children:[
      { path: '', component: LoginComponent},
    ]
  },
  {
    path: 'sistema',
    component: NavigationComponent,
    children: [
      { path: 'cards', component: CardsComponent, canActivate: [AuthGuard] },
      { path: 'relatorio-entrega', component: REntregasComponent, canActivate: [AuthGuard] },
      { path: 'etiquetas', component: EtiquetaComponent, canActivate: [AuthGuard] },
      { path: 'atualizar', component: UpdatecteComponent, canActivate: [AuthGuard] },
      { path: 'editfunc', component: ManageEmployeesComponent, canActivate: [AuthGuard]},
      { path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
      { path: 'users', component: UsersComponent, canActivate:[AuthGuard]},
      { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard]},
      { path: 'delayed', component: DelayedcteComponent, canActivate:[AuthGuard]},
      { path: 'close-report', component: CloseReportComponent, canActivate:[AuthGuard]},
      { path: 'print', redirectTo: "/print", pathMatch: 'full'},
      { path: 'home', redirectTo: 'cards', pathMatch: 'full' },
      { path: '', redirectTo: 'cards', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:invoiceIds', component: PrintREntregasComponent, canActivate: [AuthGuard] },
      { path: "", redirectTo: 'sistema/home', pathMatch:'full'}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: "sistema/home",
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
