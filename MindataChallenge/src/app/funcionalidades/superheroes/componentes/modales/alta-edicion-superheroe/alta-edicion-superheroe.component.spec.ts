import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { Superheroe } from '../../../modelos/superheroe.model';
import { AltaEdicionSuperheroeComponent } from './alta-edicion-superheroe.component';

describe('AltaEdicionSuperheroeComponent', () => {
  const superheroe: Superheroe = {
    id: 1,
    nombre: 'SPIDERMAN',
    edad: 23,
    altura: 1.78,
    urlImagen: 'data:image/png;base64,imagen',
    descripcion: 'Héroe arácnido',
  };
  const modal = { close: jasmine.createSpy('close') };

  beforeEach(() => modal.close.calls.reset());

  it('renderiza el formulario de alta sin mostrar errores antes de interactuar', () => {
    const fixture = crearComponente(null);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Agregar superheroe');
    expect(fixture.debugElement.query(By.css('.error-imagen'))).toBeNull();
    expect(fixture.debugElement.queryAll(By.css('input')).length).toBe(4);
  });

  it('muestra el error de imagen requerida después de tocar el selector', () => {
    const fixture = crearComponente(null);
    fixture.componentInstance.seleccionarImagen({
      target: { files: [] },
    } as unknown as Event);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.error-imagen')).nativeElement.textContent).toContain(
      'La imagen es obligatoria.',
    );
  });

  it('rechaza archivos que no son imágenes', () => {
    const fixture = crearComponente(null);
    const selector = { files: [new File(['texto'], 'archivo.txt', { type: 'text/plain' })], value: 'archivo' };

    fixture.componentInstance.seleccionarImagen({ target: selector } as unknown as Event);

    expect(fixture.componentInstance.errorImagen()).toBe(
      'El archivo seleccionado debe ser una imagen.',
    );
    expect(selector.value).toBe('');
  });

  it('rechaza imágenes que superan los 5 MB', () => {
    const fixture = crearComponente(null);
    const archivo = new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'grande.png', {
      type: 'image/png',
    });
    const selector = { files: [archivo], value: 'archivo' };

    fixture.componentInstance.seleccionarImagen({ target: selector } as unknown as Event);

    expect(fixture.componentInstance.errorImagen()).toBe('La imagen no puede superar los 5 MB.');
    expect(selector.value).toBe('');
  });

  it('carga una imagen válida y actualiza su vista previa', () => {
    const fixture = crearComponente(null);
    const resultado = 'data:image/png;base64,resultado';
    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function (this: FileReader) {
      Object.defineProperty(this, 'result', { configurable: true, value: resultado });
      this.onload?.(new ProgressEvent('load') as ProgressEvent<FileReader>);
    });

    fixture.componentInstance.seleccionarImagen({
      target: { files: [new File(['imagen'], 'imagen.png', { type: 'image/png' })], value: 'imagen' },
    } as unknown as Event);
    fixture.detectChanges();

    expect(fixture.componentInstance.formulario.controls.urlImagen.value).toBe(resultado);
    expect(fixture.componentInstance.vistaPreviaImagen()).toBe(resultado);
    expect(fixture.componentInstance.formulario.controls.urlImagen.dirty).toBeTrue();
    expect(fixture.debugElement.query(By.css('.vista-previa-imagen'))).not.toBeNull();
  });

  it('informa cuando no puede leer una imagen', () => {
    const fixture = crearComponente(null);
    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function (this: FileReader) {
      this.onerror?.(new ProgressEvent('error') as ProgressEvent<FileReader>);
    });

    fixture.componentInstance.seleccionarImagen({
      target: { files: [new File(['imagen'], 'imagen.png', { type: 'image/png' })], value: 'imagen' },
    } as unknown as Event);

    expect(fixture.componentInstance.errorImagen()).toBe(
      'No fue posible leer la imagen seleccionada.',
    );
  });

  it('marca los controles como tocados y no cierra un alta inválida', () => {
    const fixture = crearComponente(null);

    fixture.componentInstance.guardar();

    expect(fixture.componentInstance.formulario.controls.nombre.touched).toBeTrue();
    expect(fixture.componentInstance.formulario.controls.urlImagen.touched).toBeTrue();
    expect(modal.close).not.toHaveBeenCalled();
  });

  it('cierra el modal con los datos de un alta válida', () => {
    const fixture = crearComponente(null);
    const nuevo = {
      nombre: 'BATMAN',
      edad: 35,
      altura: 1.88,
      urlImagen: 'data:image/png;base64,batman',
      descripcion: 'Detective',
    };
    fixture.componentInstance.formulario.setValue(nuevo);

    fixture.componentInstance.guardar();

    expect(modal.close).toHaveBeenCalledWith(nuevo);
  });

  it('precarga y guarda los datos durante una edición', () => {
    const fixture = crearComponente(superheroe);
    fixture.detectChanges();
    fixture.componentInstance.formulario.controls.nombre.setValue('PETER PARKER');

    fixture.componentInstance.guardar();

    expect(fixture.nativeElement.textContent).toContain('Editar superheroe');
    expect(fixture.componentInstance.vistaPreviaImagen()).toBe(superheroe.urlImagen);
    expect(modal.close).toHaveBeenCalledWith({ ...superheroe, nombre: 'PETER PARKER' });
  });

  function crearComponente(
    datos: Superheroe | null,
  ): ComponentFixture<AltaEdicionSuperheroeComponent> {
    TestBed.configureTestingModule({
      imports: [AltaEdicionSuperheroeComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: datos },
        { provide: MatDialogRef, useValue: modal },
      ],
    });
    return TestBed.createComponent(AltaEdicionSuperheroeComponent);
  }
});
