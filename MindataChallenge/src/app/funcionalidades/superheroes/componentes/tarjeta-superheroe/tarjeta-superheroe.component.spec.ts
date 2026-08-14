import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
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
  const notificaciones = {
    exito: jasmine.createSpy('exito'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(() => {
    servicio.modificarSuperheroe.calls.reset();
    servicio.eliminarSuperheroe.calls.reset();
    notificaciones.exito.calls.reset();
    notificaciones.error.calls.reset();
    servicio.modificarSuperheroe.and.returnValue(of(superheroe));
    servicio.eliminarSuperheroe.and.returnValue(of(true));
    TestBed.configureTestingModule({ imports: [TarjetaSuperheroeComponent] });
    TestBed.overrideProvider(ServicioSuperheroes, { useValue: servicio });
    TestBed.overrideProvider(NotificacionesService, { useValue: notificaciones });
  });

  it('renderiza los datos y abre la edición desde el botón', () => {
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    const abrirModal = simularCierreModal(fixture.componentInstance, undefined);
    fixture.detectChanges();

    fixture.debugElement.query(By.css('.boton-editar')).nativeElement.click();

    expect(fixture.nativeElement.textContent).toContain('Spiderman');
    expect(fixture.nativeElement.textContent).toContain('Héroe arácnido');
    expect(abrirModal).toHaveBeenCalledTimes(1);
  });

  it('Debería modifciar el superhéroe confirmado en el modal de edición', () => {
    const modificado = { ...superheroe, nombre: 'Peter Parker' };
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    simularCierreModal(fixture.componentInstance, modificado);
    fixture.componentInstance.abrirEdicion();
    expect(servicio.modificarSuperheroe).toHaveBeenCalledWith(modificado);
    expect(notificaciones.exito).toHaveBeenCalledWith('Superhéroe editado correctamente.');
  });

  it('no modifica el superhéroe cuando se cancela el modal de edición', () => {
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    simularCierreModal(fixture.componentInstance, undefined);

    fixture.componentInstance.abrirEdicion();

    expect(servicio.modificarSuperheroe).not.toHaveBeenCalled();
    expect(notificaciones.exito).not.toHaveBeenCalled();
    expect(notificaciones.error).not.toHaveBeenCalled();
  });

  it('notifica un error si el superhéroe a modificar ya no existe', () => {
    const modificado = { ...superheroe, nombre: 'Peter Parker' };
    servicio.modificarSuperheroe.and.returnValue(of(null));
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    simularCierreModal(fixture.componentInstance, modificado);

    fixture.componentInstance.abrirEdicion();

    expect(notificaciones.error).toHaveBeenCalledWith('No se pudo editar el superhéroe.');
    expect(notificaciones.exito).not.toHaveBeenCalled();
  });

  it('Elimina el superhéroe únicamente después de confirmarlo', () => {
    const fixture = TestBed.createComponent(TarjetaSuperheroeComponent);
    fixture.componentRef.setInput('superheroe', superheroe);
    const abrirModal = simularCierreModal(fixture.componentInstance, true);
    fixture.componentInstance.abrirConfirmacionEliminacion();
    expect(abrirModal).toHaveBeenCalledTimes(1);
    expect(servicio.eliminarSuperheroe).toHaveBeenCalledWith(superheroe.id);
    expect(notificaciones.exito).toHaveBeenCalledWith('Superhéroe eliminado correctamente.');
  });

  function simularCierreModal(
    componente: TarjetaSuperheroeComponent,
    resultado: Superheroe | boolean | undefined,
  ): jasmine.Spy {
    const dialogo = (componente as unknown as { modal: MatDialog }).modal;
    return spyOn(dialogo, 'open').and.returnValue({
      afterClosed: () => of(resultado),
    } as ReturnType<MatDialog['open']>);
  }
});
