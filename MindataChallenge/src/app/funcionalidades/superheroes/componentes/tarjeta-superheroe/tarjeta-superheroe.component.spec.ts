import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Superheroe } from '../../modelos/superheroe.model';
import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import { TarjetaSuperheroeComponent } from './tarjeta-superheroe.component';

describe('TarjetaSuperheroeComponent', () => {
  const superheroe: Superheroe = {
    id: 1,
    nombre: 'Spiderman',
    edad: 23,
    altura: 1.78,
    urlImagen: '/spiderman.webp',
    descripcion: 'Héroe arácnido',
  };
  const servicio = {
    modificarSuperheroe: jasmine.createSpy('modificarSuperheroe').and.returnValue(of(superheroe)),
    eliminarSuperheroe: jasmine.createSpy('eliminarSuperheroe').and.returnValue(of(true)),
  };
  const modal = { open: jasmine.createSpy('open') };

  beforeEach(() => {
    servicio.modificarSuperheroe.calls.reset();
    servicio.eliminarSuperheroe.calls.reset();
    modal.open.calls.reset();
    TestBed.configureTestingModule({
      imports: [TarjetaSuperheroeComponent],
      providers: [
        { provide: ServicioSuperheroes, useValue: servicio },
        { provide: MatDialog, useValue: modal },
      ],
    }).overrideComponent(TarjetaSuperheroeComponent, {
      set: {
        template: '',
        providers: [
          { provide: ServicioSuperheroes, useValue: servicio },
          { provide: MatDialog, useValue: modal },
        ],
      },
    });
  });

  it('Debería modifciar el superhéroe confirmado en el modal de edición', () => {
    const modificado = { ...superheroe, nombre: 'Peter Parker' };
    modal.open.and.returnValue({ afterClosed: () => of(modificado) });
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    fixture.componentInstance.abrirEdicion();
    expect(servicio.modificarSuperheroe).toHaveBeenCalledWith(modificado);
  });

  it('Elimina el superhéroe únicamente después de confirmarlo', () => {
    modal.open.and.returnValue({ afterClosed: () => of(true) });
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    fixture.componentInstance.abrirConfirmacionEliminacion();
    expect(modal.open).toHaveBeenCalledTimes(1);
    expect(servicio.eliminarSuperheroe).toHaveBeenCalledWith(superheroe.id);
  });
});
