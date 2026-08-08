import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Superheroe } from '../../modelos/superheroe.model';

@Component({
  selector: 'app-tarjeta-superheroe',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './tarjeta-superheroe.component.html',
  styleUrl: './tarjeta-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarjetaSuperheroeComponent {
  readonly superheroe = input.required<Superheroe>();
  protected readonly imagenNoDisponible = signal(false);
}
