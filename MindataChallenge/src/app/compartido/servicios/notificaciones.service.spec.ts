import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificacionesService } from './notificaciones.service';

describe('NotificacionesService', () => {
  const snackBar = { open: jasmine.createSpy('open') };
  let servicio: NotificacionesService;

  beforeEach(() => {
    snackBar.open.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        NotificacionesService,
        { provide: MatSnackBar, useValue: snackBar },
      ],
    });
    servicio = TestBed.inject(NotificacionesService);
  });

  it('muestra una notificación de éxito con su estilo', () => {
    servicio.exito('Operación exitosa.');

    expect(snackBar.open).toHaveBeenCalledWith('Operación exitosa.', 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['toast-exito'],
    });
  });

  it('muestra una notificación de error con su estilo', () => {
    servicio.error('Ocurrió un error.');

    expect(snackBar.open).toHaveBeenCalledWith('Ocurrió un error.', 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['toast-error'],
    });
  });
});
