import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { MaterialModule } from '../../../../compartido/material/material.module';
import { Superheroe } from '../../modelos/superheroe.model';
import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import {
  AltaEdicionSuperheroeComponent,
  ResultadoAltaEdicion,
} from '../modales/alta-edicion-superheroe/alta-edicion-superheroe.component';
import {
  ConfirmacionEliminacionComponent,
  SuperheroeAEliminar,
} from '../modales/confirmacion-eliminacion/confirmacion-eliminacion.component';

@Component({
  selector: 'app-tarjeta-superheroe',
  imports: [MaterialModule],
  templateUrl: './tarjeta-superheroe.component.html',
  styleUrl: './tarjeta-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaSuperheroeComponent {
  private readonly modal = inject(MatDialog);
  private readonly servicioSuperheroes = inject(ServicioSuperheroes);
  public readonly superheroe = input.required<Superheroe>();

  public abrirEdicion(): void {
    const referenciaModal = this.modal.open<
      AltaEdicionSuperheroeComponent,
      Superheroe,
      ResultadoAltaEdicion
    >(AltaEdicionSuperheroeComponent, { data: this.superheroe() });

    referenciaModal
      .afterClosed()
      .pipe(take(1))
      .subscribe((resultado) => {
        if (resultado && 'id' in resultado) {
          this.servicioSuperheroes.modificarSuperheroe(resultado).pipe(take(1)).subscribe();
        }
      });
  }

  public abrirConfirmacionEliminacion(): void {
    const { id, nombre } = this.superheroe();

    const referenciaModal = this.modal.open<
      ConfirmacionEliminacionComponent,
      SuperheroeAEliminar,
      boolean
    >(ConfirmacionEliminacionComponent, { data: { id, nombre } });

    referenciaModal
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmado) => {
        if (confirmado) {
          this.servicioSuperheroes.eliminarSuperheroe(id).pipe(take(1)).subscribe();
        }
      });
  }
}
