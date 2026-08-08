import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import { TarjetaSuperheroeComponent } from '../tarjeta-superheroe/tarjeta-superheroe.component';

@Component({
  selector: 'app-lista-superheroes',
  imports: [TarjetaSuperheroeComponent],
  templateUrl: './lista-superheroes.component.html',
  styleUrl: './lista-superheroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaSuperheroesComponent {
  private readonly servicioSuperheroes = inject(ServicioSuperheroes);

  protected readonly superheroes = this.servicioSuperheroes.superheroes;
}
