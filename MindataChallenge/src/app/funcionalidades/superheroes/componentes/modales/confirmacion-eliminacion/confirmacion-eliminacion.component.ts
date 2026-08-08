import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from '../../../../../compartido/material/material.module';
import { Superheroe } from '../../../modelos/superheroe.model';

export type SuperheroeAEliminar = Pick<Superheroe, 'id' | 'nombre'>;

@Component({
  selector: 'app-confirmacion-eliminacion',
  imports: [MaterialModule],
  templateUrl: './confirmacion-eliminacion.component.html',
  styleUrl: './confirmacion-eliminacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmacionEliminacionComponent {
  public readonly superheroe = inject<SuperheroeAEliminar>(MAT_DIALOG_DATA);
}
