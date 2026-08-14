import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MayusculasDirective } from './mayusculas.directive';

@Component({
  imports: [MayusculasDirective, ReactiveFormsModule],
  template: '<input appMayusculas [formControl]="nombre" />',
})
class ComponentePrueba {
  public readonly nombre = new FormControl('', { nonNullable: true });
}

describe('MayusculasDirective', () => {
  let fixture: ComponentFixture<ComponentePrueba>;
  let campo: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ComponentePrueba] });
    fixture = TestBed.createComponent(ComponentePrueba);
    fixture.detectChanges();
    campo = fixture.debugElement.query(By.css('input')).nativeElement;
  });

  it('muestra y guarda el nombre en mayúsculas mientras se escribe', () => {
    campo.value = 'Peter Parker';
    campo.dispatchEvent(new Event('input'));

    expect(campo.value).toBe('PETER PARKER');
    expect(fixture.componentInstance.nombre.value).toBe('PETER PARKER');
  });

  it('convierte en mayúsculas el texto pegado', () => {
    campo.value = 'bruce wayne';
    campo.setSelectionRange(11, 11);
    campo.dispatchEvent(new InputEvent('input', { inputType: 'insertFromPaste' }));

    expect(campo.value).toBe('BRUCE WAYNE');
    expect(fixture.componentInstance.nombre.value).toBe('BRUCE WAYNE');
  });

  it('convierte una edición en medio de la cadena y conserva el cursor', () => {
    campo.value = 'PETER pARKER';
    campo.setSelectionRange(7, 7);
    campo.dispatchEvent(new Event('input'));

    expect(campo.value).toBe('PETER PARKER');
    expect(campo.selectionStart).toBe(7);
    expect(campo.selectionEnd).toBe(7);
  });

  it('permite borrar parcialmente y volver a escribir en mayúsculas', () => {
    campo.value = 'PETER PARKER';
    campo.dispatchEvent(new Event('input'));
    campo.value = 'PETER ARKER';
    campo.setSelectionRange(6, 6);
    campo.dispatchEvent(new Event('input'));

    expect(fixture.componentInstance.nombre.value).toBe('PETER ARKER');

    campo.value = 'PETER pARKER';
    campo.setSelectionRange(7, 7);
    campo.dispatchEvent(new Event('input'));

    expect(campo.value).toBe('PETER PARKER');
    expect(fixture.componentInstance.nombre.value).toBe('PETER PARKER');
  });
});
