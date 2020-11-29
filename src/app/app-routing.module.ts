import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//modules
import {REntregasComponent} from './r-entregas/r-entregas.component'
import {CardsComponent} from './cards/cards.component'
import { EtiquetaComponent } from './etiqueta/etiqueta.component';

const routes: Routes = [
  { path: 'cards', component: CardsComponent},
  { path: 'relatorio-entrega', component: REntregasComponent},
  { path: 'etiquetas', component: EtiquetaComponent },
  { path: '', redirectTo: '/cards', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
