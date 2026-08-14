import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ConfirmacionEliminacionComponent } from './confirmacion-eliminacion.component';

describe('ConfirmacionEliminacionComponent', () => {
  const modal = { close: jasmine.createSpy('close') };

  beforeEach(() => {
    modal.close.calls.reset();
    TestBed.configureTestingModule({
      imports: [ConfirmacionEliminacionComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { id: 1, nombre: 'Spiderman' } },
        { provide: MatDialogRef, useValue: modal },
      ],
    });
  });

  it('muestra el nombre del superhéroe que se eliminará', () => {
    const fixture = TestBed.createComponent(ConfirmacionEliminacionComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      '¿Estás seguro de que querés eliminar a Spiderman?',
    );
  });

  it('devuelve false al cancelar y true al confirmar', () => {
    const fixture = TestBed.createComponent(ConfirmacionEliminacionComponent);
    fixture.detectChanges();
    const botones = fixture.debugElement.queryAll(By.css('button'));

    botones[0].nativeElement.click();
    expect(modal.close).toHaveBeenCalledWith(false);

    botones[1].nativeElement.click();
    expect(modal.close).toHaveBeenCalledWith(true);
  });
});
