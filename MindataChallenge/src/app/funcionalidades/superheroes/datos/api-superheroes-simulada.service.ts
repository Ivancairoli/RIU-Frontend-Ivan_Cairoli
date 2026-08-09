import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Superheroe } from '../modelos/superheroe.model';
import { SUPERHEROES_SIMULADOS } from './superheroes.simulados';

@Injectable({ providedIn: 'root' })
export class ApiSuperheroesSimuladaService implements InMemoryDbService {
  createDb(): { superheroes: Superheroe[] } {
    return {
      superheroes: SUPERHEROES_SIMULADOS.map((superheroe) => ({ ...superheroe })),
    };
  }

  genId(superheroes: Superheroe[]): number {
    const ids = superheroes.map((superheroe) => superheroe.id);
    return Math.max(0, ...ids) + 1;
  }
}
