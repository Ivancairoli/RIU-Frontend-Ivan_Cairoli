import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Superheroe } from '../../modelos/superheroe.model';
import { ConfirmacionEliminacionComponent } from '../modales/confirmacion-eliminacion/confirmacion-eliminacion.component';
import { EdicionSuperheroeComponent } from '../modales/edicion-superheroe/edicion-superheroe.component';

@Component({
  selector: 'app-tarjeta-superheroe',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './tarjeta-superheroe.component.html',
  styleUrl: './tarjeta-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaSuperheroeComponent {
  private readonly modal = inject(MatDialog);
  public readonly superheroe = input.required<Superheroe>();

  abrirEdicion(): void {
    this.modal.open(EdicionSuperheroeComponent, {
      data: this.superheroe(),
    });
  }

  abrirConfirmacionEliminacion(): void {
    const { id, nombre } = this.superheroe();

    this.modal.open(ConfirmacionEliminacionComponent, {
      data: { id, nombre },
    });
  }
}
