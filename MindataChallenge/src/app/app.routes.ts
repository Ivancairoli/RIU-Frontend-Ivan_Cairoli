import { Routes } from '@angular/router';

import { DashboardIngresoComponent } from './funcionalidades/inicio/componentes/dashboard-ingreso/dashboard-ingreso.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardIngresoComponent,
    pathMatch: 'full',
    title: 'Inicio',
  },
  {
    path: 'superheroes',
    loadChildren: () =>
      import('./funcionalidades/superheroes/superheroes.routes').then(
        ({ RUTAS_SUPERHEROES }) => RUTAS_SUPERHEROES,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
