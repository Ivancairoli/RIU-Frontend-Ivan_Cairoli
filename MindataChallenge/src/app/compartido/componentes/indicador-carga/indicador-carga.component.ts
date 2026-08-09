import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MaterialModule } from '../../material/material.module';
import { ServicioCarga } from '../../servicios/carga.service';

@Component({
  selector: 'app-indicador-carga',
  imports: [MaterialModule],
  templateUrl: './indicador-carga.component.html',
  styleUrl: './indicador-carga.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndicadorCargaComponent {
  public readonly servicioCarga = inject(ServicioCarga);
}
