import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Superheroe } from '../../../modelos/superheroe.model';

export type SuperheroeAEliminar = Pick<Superheroe, 'id' | 'nombre'>;

@Component({
  selector: 'app-confirmacion-eliminacion',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirmacion-eliminacion.component.html',
  styleUrl: './confirmacion-eliminacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmacionEliminacionComponent {
  public readonly superheroe = inject<SuperheroeAEliminar>(MAT_DIALOG_DATA);
}
