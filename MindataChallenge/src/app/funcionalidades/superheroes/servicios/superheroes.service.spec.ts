import { TestBed } from '@angular/core/testing';

import { ServicioSuperheroes } from './superheroes.service';

describe('ServicioSuperheroes', () => {
  let servicio: ServicioSuperheroes;

  beforeEach(() => {
    servicio = TestBed.inject(ServicioSuperheroes);
  });
});
