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


const routes: Routes = [
  {
    path: 'sistema',
    outlet: 'sistema',
    component: NavigationComponent,
    children: [
      { path: 'cards', component: CardsComponent },
      { path: 'relatorio-entrega', component: REntregasComponent },
      { path: 'etiquetas', component: EtiquetaComponent },
      { path: 'atualizar', component: UpdatecteComponent },
      { path: 'home', redirectTo: '/cards', pathMatch: 'full' },
    ] 
  },
  {
    path: 'print',
    outlet: 'print',
    component: PrintLayoutComponent,
    children: [
      { path: 'invoice/:invoiceIds', component: PrintREntregasComponent }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
