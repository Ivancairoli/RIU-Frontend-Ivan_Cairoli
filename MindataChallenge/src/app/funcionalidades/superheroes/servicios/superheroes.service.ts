import { Injectable, signal } from '@angular/core';

import { SUPERHEROES_SIMULADOS } from '../datos/superheroes.simulados';

@Injectable({ providedIn: 'root' })
export class ServicioSuperheroes {
  private readonly estadoSuperheroes = signal(SUPERHEROES_SIMULADOS);

  readonly superheroes = this.estadoSuperheroes.asReadonly();
}
