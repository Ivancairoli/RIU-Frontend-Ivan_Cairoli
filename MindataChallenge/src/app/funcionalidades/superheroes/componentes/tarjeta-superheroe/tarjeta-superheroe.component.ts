import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../../../../compartido/material/material.module';
import { Superheroe } from '../../modelos/superheroe.model';
import { AltaEdicionSuperheroeComponent } from '../modales/alta-edicion-superheroe/alta-edicion-superheroe.component';
import { ConfirmacionEliminacionComponent } from '../modales/confirmacion-eliminacion/confirmacion-eliminacion.component';

@Component({
  selector: 'app-tarjeta-superheroe',
  imports: [MaterialModule],
  templateUrl: './tarjeta-superheroe.component.html',
  styleUrl: './tarjeta-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaSuperheroeComponent {
  private readonly modal = inject(MatDialog);
  public readonly superheroe = input.required<Superheroe>();

  public abrirEdicion(): void {
    this.modal.open(AltaEdicionSuperheroeComponent, {
      data: this.superheroe(),
    });
  }

  public abrirConfirmacionEliminacion(): void {
    const { id, nombre } = this.superheroe();

    this.modal.open(ConfirmacionEliminacionComponent, {
      data: { id, nombre },
    });
  }
}
