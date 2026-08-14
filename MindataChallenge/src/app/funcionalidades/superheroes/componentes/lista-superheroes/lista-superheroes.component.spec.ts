import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { NuevoSuperheroe, Superheroe } from '../../modelos/superheroe.model';
import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import { NotificacionesService } from '../../../../compartido/servicios/notificaciones.service';
import { ListaSuperheroesComponent } from './lista-superheroes.component';

describe('ListaSuperheroesComponent', () => {
  const superheroes: Superheroe[] = Array.from({ length: 4 }, (_, indice) => ({
    id: indice + 1,
    nombre: `Héroe ${indice + 1}`,
    edad: 30,
    altura: 1.8,
    urlImagen: '/heroe.webp',
    descripcion: 'Descripción',
  }));
  const estado = signal<readonly Superheroe[]>(superheroes);
  const servicio = {
    superheroes: estado.asReadonly(),
    consultarTodos: jasmine.createSpy('consultarTodos').and.returnValue(of(superheroes)),
    consultarPorNombre: jasmine
      .createSpy('consultarPorNombre')
      .and.returnValue(of([superheroes[0]])),
    registrar: jasmine
      .createSpy('registrar')
      .and.callFake((nuevo: NuevoSuperheroe) => of({ id: 5, ...nuevo })),
    modificarSuperheroe: jasmine.createSpy('modificarSuperheroe'),
    eliminarSuperheroe: jasmine.createSpy('eliminarSuperheroe'),
  };
  const notificaciones = {
    exito: jasmine.createSpy('exito'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(() => {
    servicio.consultarTodos.calls.reset();
    servicio.consultarPorNombre.calls.reset();
    servicio.registrar.calls.reset();
    servicio.modificarSuperheroe.calls.reset();
    servicio.eliminarSuperheroe.calls.reset();
    notificaciones.exito.calls.reset();
    notificaciones.error.calls.reset();
    estado.set(superheroes);
    TestBed.configureTestingModule({ imports: [ListaSuperheroesComponent] });
    TestBed.overrideProvider(ServicioSuperheroes, { useValue: servicio });
    TestBed.overrideProvider(NotificacionesService, { useValue: notificaciones });
  });

  it('carga la lista y filtra por nombre', async () => {
    const fixture = TestBed.createComponent(ListaSuperheroesComponent);
    const componente = fixture.componentInstance;
    await esperarDebounce();
    expect(servicio.consultarTodos).toHaveBeenCalledTimes(1);

    componente.actualizarFiltro({ target: { value: 'Spider' } } as unknown as Event);
    await esperarDebounce();

    expect(servicio.consultarPorNombre).toHaveBeenCalledWith('Spider');
    expect(componente.filtroNombre()).toBe('Spider');
    expect(componente.indicePagina()).toBe(0);
  });

  function esperarDebounce(): Promise<void> {
    return new Promise((resolver) => setTimeout(resolver, 350));
  }

  it('pagina los resultados según el índice y la cantidad seleccionada', () => {
    const componente = TestBed.createComponent(ListaSuperheroesComponent).componentInstance;

    componente.cambiarPagina({ pageIndex: 1, pageSize: 3, length: 4 });

    expect(componente.superheroesPaginados()).toEqual([superheroes[3]]);
  });

  it('limpia el filtro y vuelve a la primera página', () => {
    const componente = TestBed.createComponent(ListaSuperheroesComponent).componentInstance;
    componente.actualizarFiltro({ target: { value: 'Spider' } } as unknown as Event);
    componente.cambiarPagina({ pageIndex: 1, pageSize: 3, length: 4 });

    componente.limpiarFiltro();

    expect(componente.filtroNombre()).toBe('');
    expect(componente.indicePagina()).toBe(0);
  });

  it('renderiza la primera página y abre el alta al hacer clic en el botón', () => {
    const fixture = TestBed.createComponent(ListaSuperheroesComponent);
    const abrirModal = simularCierreModal(fixture.componentInstance, undefined);
    fixture.detectChanges();

    const tarjetas = fixture.debugElement.queryAll(By.css('app-tarjeta-superheroe'));
    const botonAgregar = fixture.debugElement.query(By.css('.boton-agregar'));
    botonAgregar.nativeElement.click();

    expect(tarjetas.length).toBe(3);
    expect(fixture.nativeElement.textContent).toContain('4 héroes disponibles');
    expect(abrirModal).toHaveBeenCalledTimes(1);
  });

  it('vuelve a la última página válida si se elimina el último elemento de la actual', () => {
    const fixture = TestBed.createComponent(ListaSuperheroesComponent);
    const componente = fixture.componentInstance;
    componente.cambiarPagina({ pageIndex: 1, pageSize: 3, length: 4 });
    fixture.detectChanges();

    estado.set(superheroes.slice(0, 3));
    fixture.detectChanges();

    expect(componente.indicePagina()).toBe(0);
    expect(componente.superheroesPaginados()).toEqual(superheroes.slice(0, 3));
    expect(fixture.debugElement.queryAll(By.css('app-tarjeta-superheroe')).length).toBe(3);
  });

  it('debería registrar el resultado del modal de creación', () => {
    const nuevo: NuevoSuperheroe = {
      nombre: 'Batman',
      edad: 35,
      altura: 1.88,
      urlImagen: '/batman.webp',
      descripcion: 'Detective',
    };
    const componente = TestBed.createComponent(ListaSuperheroesComponent).componentInstance;
    const abrirModal = simularCierreModal(componente, nuevo);

    componente.abrirModalCreacion();

    expect(abrirModal).toHaveBeenCalledTimes(1);
    expect(servicio.registrar).toHaveBeenCalledWith(nuevo);
    expect(notificaciones.exito).toHaveBeenCalledWith('Superhéroe creado correctamente.');
  });

  function simularCierreModal(
    componente: ListaSuperheroesComponent,
    resultado: NuevoSuperheroe | undefined,
  ): jasmine.Spy {
    const dialogo = (componente as unknown as { modal: MatDialog }).modal;
    return spyOn(dialogo, 'open').and.returnValue({
      afterClosed: () => of(resultado),
    } as ReturnType<MatDialog['open']>);
  }
});
