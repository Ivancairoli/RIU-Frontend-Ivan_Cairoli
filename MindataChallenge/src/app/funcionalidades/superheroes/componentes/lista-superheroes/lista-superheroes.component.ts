import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import { AltaEdicionSuperheroeComponent } from '../modales/alta-edicion-superheroe/alta-edicion-superheroe.component';
import { TarjetaSuperheroeComponent } from '../tarjeta-superheroe/tarjeta-superheroe.component';

@Component({
  selector: 'app-lista-superheroes',
  imports: [MatButtonModule, MatIconModule, TarjetaSuperheroeComponent],
  templateUrl: './lista-superheroes.component.html',
  styleUrl: './lista-superheroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaSuperheroesComponent {
  private readonly servicioSuperheroes = inject(ServicioSuperheroes);
  private readonly modal = inject(MatDialog);
  public readonly superheroes = this.servicioSuperheroes.superheroes;

  public abrirModalCreacion(): void {
    this.modal.open(AltaEdicionSuperheroeComponent, {
      data: null,
    });
  }
}
