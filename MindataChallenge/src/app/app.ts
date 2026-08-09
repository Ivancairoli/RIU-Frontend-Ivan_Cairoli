import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { IndicadorCargaComponent } from './compartido/componentes/indicador-carga/indicador-carga.component';

@Component({
  selector: 'app-root',
  imports: [IndicadorCargaComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
