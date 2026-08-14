import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs';
import { MaterialModule } from '../../../../compartido/material/material.module';
import { NotificacionesService } from '../../../../compartido/servicios/notificaciones.service';
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
  private readonly notificaciones = inject(NotificacionesService);
  public readonly superheroe = input.required<Superheroe>();

  public abrirEdicion(): void {
    const referenciaModal = this.modal.open<
      AltaEdicionSuperheroeComponent,
      Superheroe,
      ResultadoAltaEdicion
    >(AltaEdicionSuperheroeComponent, { data: this.superheroe() });

    referenciaModal
      .afterClosed()
      .pipe(
        take(1),
        filter(
          (resultado): resultado is Superheroe => !!resultado && 'id' in resultado,
        ),
        switchMap((resultado) => this.servicioSuperheroes.modificarSuperheroe(resultado)),
      )
      .subscribe({
        next: (modificado) =>
          modificado
            ? this.notificaciones.exito('Superhéroe editado correctamente.')
            : this.notificaciones.error('No se pudo editar el superhéroe.'),
        error: () => this.notificaciones.error('No se pudo editar el superhéroe.'),
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
      .pipe(
        take(1),
        filter((confirmado): confirmado is true => confirmado === true),
        switchMap(() => this.servicioSuperheroes.eliminarSuperheroe(id)),
      )
      .subscribe({
        next: (eliminado) =>
          eliminado
            ? this.notificaciones.exito('Superhéroe eliminado correctamente.')
            : this.notificaciones.error('No se pudo eliminar el superhéroe.'),
        error: () => this.notificaciones.error('No se pudo eliminar el superhéroe.'),
      });
  }
}
