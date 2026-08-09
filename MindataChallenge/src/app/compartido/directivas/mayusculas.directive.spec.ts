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
});
