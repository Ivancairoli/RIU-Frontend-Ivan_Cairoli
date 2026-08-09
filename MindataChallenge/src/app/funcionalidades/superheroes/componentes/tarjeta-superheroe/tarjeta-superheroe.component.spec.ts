import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { Superheroe } from '../../modelos/superheroe.model';
import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import { NotificacionesService } from '../../../../compartido/servicios/notificaciones.service';
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
  const notificaciones = {
    exito: jasmine.createSpy('exito'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(() => {
    servicio.modificarSuperheroe.calls.reset();
    servicio.eliminarSuperheroe.calls.reset();
    modal.open.calls.reset();
    notificaciones.exito.calls.reset();
    notificaciones.error.calls.reset();
    TestBed.configureTestingModule({
      imports: [TarjetaSuperheroeComponent],
      providers: [
        { provide: ServicioSuperheroes, useValue: servicio },
        { provide: MatDialog, useValue: modal },
        { provide: NotificacionesService, useValue: notificaciones },
      ],
    }).overrideComponent(TarjetaSuperheroeComponent, {
      set: {
        template: '',
        providers: [
          { provide: ServicioSuperheroes, useValue: servicio },
          { provide: MatDialog, useValue: modal },
          { provide: NotificacionesService, useValue: notificaciones },
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
    expect(notificaciones.exito).toHaveBeenCalledWith('Superhéroe editado correctamente.');
  });

  it('Elimina el superhéroe únicamente después de confirmarlo', () => {
    modal.open.and.returnValue({ afterClosed: () => of(true) });
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    fixture.componentInstance.abrirConfirmacionEliminacion();
    expect(modal.open).toHaveBeenCalledTimes(1);
    expect(servicio.eliminarSuperheroe).toHaveBeenCalledWith(superheroe.id);
    expect(notificaciones.exito).toHaveBeenCalledWith('Superhéroe eliminado correctamente.');
  });
});
