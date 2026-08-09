import { Routes } from '@angular/router';

import { ListaSuperheroesComponent } from './componentes/lista-superheroes/lista-superheroes.component';

export const RUTAS_SUPERHEROES: Routes = [
  {
    path: '',
    component: ListaSuperheroesComponent,
    title: 'Superhéroes',
  },
];
