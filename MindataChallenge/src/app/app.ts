import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IndicadorCargaComponent } from './compartido/componentes/indicador-carga/indicador-carga.component';
import { ListaSuperheroesComponent } from './funcionalidades/superheroes/componentes/lista-superheroes/lista-superheroes.component';

@Component({
  selector: 'app-root',
  imports: [IndicadorCargaComponent, ListaSuperheroesComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
