import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
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
  };
  const modal = { open: jasmine.createSpy('open') };
  const notificaciones = {
    exito: jasmine.createSpy('exito'),
    error: jasmine.createSpy('error'),
  };

  beforeEach(() => {
    servicio.consultarTodos.calls.reset();
    servicio.consultarPorNombre.calls.reset();
    servicio.registrar.calls.reset();
    modal.open.calls.reset();
    notificaciones.exito.calls.reset();
    notificaciones.error.calls.reset();
    estado.set(superheroes);
    TestBed.configureTestingModule({
      imports: [ListaSuperheroesComponent],
      providers: [
        { provide: ServicioSuperheroes, useValue: servicio },
        { provide: MatDialog, useValue: modal },
        { provide: NotificacionesService, useValue: notificaciones },
      ],
    }).overrideComponent(ListaSuperheroesComponent, {
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

  it('debería registrar el resultado del modal de creación', () => {
    const nuevo: NuevoSuperheroe = {
      nombre: 'Batman',
      edad: 35,
      altura: 1.88,
      urlImagen: '/batman.webp',
      descripcion: 'Detective',
    };
    modal.open.and.returnValue({ afterClosed: () => of(nuevo) });
    const componente = TestBed.createComponent(ListaSuperheroesComponent).componentInstance;

    componente.abrirModalCreacion();

    expect(modal.open).toHaveBeenCalledTimes(1);
    expect(servicio.registrar).toHaveBeenCalledWith(nuevo);
    expect(notificaciones.exito).toHaveBeenCalledWith('Superhéroe creado correctamente.');
  });
});
