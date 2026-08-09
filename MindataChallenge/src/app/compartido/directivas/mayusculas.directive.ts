import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[appMayusculas]',
})
export class MayusculasDirective {
  private readonly controlFormulario = inject(NgControl, { optional: true, self: true });

  @HostListener('input', ['$event'])
  public convertirAMayusculas(evento: Event): void {
    const campo = evento.target as HTMLInputElement;
    const valorMayusculas = campo.value.toUpperCase();

    if (campo.value === valorMayusculas) {
      return;
    }

    const inicioSeleccion = campo.selectionStart;
    const finSeleccion = campo.selectionEnd;
    campo.value = valorMayusculas;
    this.controlFormulario?.control?.setValue(valorMayusculas, { emitEvent: false });

    if (inicioSeleccion !== null && finSeleccion !== null) {
      campo.setSelectionRange(inicioSeleccion, finSeleccion);
    }
  }
}
