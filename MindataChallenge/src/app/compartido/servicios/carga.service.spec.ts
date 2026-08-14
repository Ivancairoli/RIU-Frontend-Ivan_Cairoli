import { TestBed } from '@angular/core/testing';

import { ServicioCarga } from './carga.service';

describe('ServicioCarga', () => {
  let servicio: ServicioCarga;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ServicioCarga] });
    servicio = TestBed.inject(ServicioCarga);
  });

  it('indica carga mientras haya solicitudes activas', () => {
    expect(servicio.estaCargando()).toBeFalse();

    servicio.iniciar();
    servicio.iniciar();
    expect(servicio.estaCargando()).toBeTrue();

    servicio.finalizar();
    expect(servicio.estaCargando()).toBeTrue();

    servicio.finalizar();
    expect(servicio.estaCargando()).toBeFalse();
  });

  it('nunca reduce la cantidad de solicitudes por debajo de cero', () => {
    servicio.finalizar();
    servicio.finalizar();

    expect(servicio.estaCargando()).toBeFalse();
  });
});
