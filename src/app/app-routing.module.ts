import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//modules
import { EtiquetaComponent } from './etiqueta/etiqueta.component';

const routes: Routes = [
  {path: 'etiquetas', component: EtiquetaComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
