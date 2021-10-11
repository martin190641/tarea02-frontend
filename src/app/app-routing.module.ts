import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './pages/persona/persona.component';
import { PersonaEdicionComponent } from './pages/persona/persona-edicion/persona-edicion.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoEdicionComponent } from './pages/producto/producto-edicion/producto-edicion.component';

const routes: Routes = [
  {
    path: 'persona', component: PersonaComponent, children: [
      { path: 'nuevo', component: PersonaEdicionComponent },
      { path: 'edicion/:id', component: PersonaEdicionComponent }
    ]
  },
  {
    path: 'producto', component: ProductoComponent, children: [
      { path: 'nuevo', component: ProductoEdicionComponent },
      { path: 'edicion/:id', component: ProductoEdicionComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
