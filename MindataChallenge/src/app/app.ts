import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ListaSuperheroesComponent } from './funcionalidades/superheroes/componentes/lista-superheroes/lista-superheroes.component';

@Component({
  selector: 'app-root',
  imports: [ListaSuperheroesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
