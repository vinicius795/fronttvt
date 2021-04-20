import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//modules
import {REntregasComponent} from './r-entregas/r-entregas.component'
import {CardsComponent} from './cards/cards.component'
import { EtiquetaComponent } from './etiqueta/etiqueta.component';
import { UpdatecteComponent } from "./updatecte/updatecte.component"
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { PrintREntregasComponent } from './print-r-entregas/print-r-entregas.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.service';


const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: 'full' },
  {
    path:'login',
    component: LoginComponent,
    children:[
      { path: '', component: LoginComponent},
      { path: 'logout', component: LogoutComponent},
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
      { path: 'home', redirectTo: 'cards', pathMatch: 'full' },
      { path: '', redirectTo: 'cards', pathMatch: 'full' },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:invoiceIds', component: PrintREntregasComponent, canActivate: [AuthGuard] }
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
