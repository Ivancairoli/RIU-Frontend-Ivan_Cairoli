import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ServicioCarga } from '../../servicios/carga.service';
import { IndicadorCargaComponent } from './indicador-carga.component';

describe('IndicadorCargaComponent', () => {
  let fixture: ComponentFixture<IndicadorCargaComponent>;
  let servicioCarga: ServicioCarga;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [IndicadorCargaComponent] });
    fixture = TestBed.createComponent(IndicadorCargaComponent);
    servicioCarga = TestBed.inject(ServicioCarga);
    fixture.detectChanges();
  });

  it('no muestra el indicador cuando no hay solicitudes activas', () => {
    expect(fixture.debugElement.query(By.css('[role="status"]'))).toBeNull();
  });

  it('muestra y anuncia el estado de carga para tecnologías asistivas', () => {
    servicioCarga.iniciar();
    fixture.detectChanges();

    const estado = fixture.debugElement.query(By.css('[role="status"]'));
    expect(estado).not.toBeNull();
    expect(estado.attributes['aria-live']).toBe('polite');
    expect(estado.nativeElement.textContent).toContain('Cargando contenido, por favor espere.');

    servicioCarga.finalizar();
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[role="status"]'))).toBeNull();
  });
});
