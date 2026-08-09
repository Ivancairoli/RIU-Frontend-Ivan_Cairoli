import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MayusculasDirective } from '../../../../../compartido/directivas/mayusculas.directive';
import { MaterialModule } from '../../../../../compartido/material/material.module';
import { NuevoSuperheroe, Superheroe } from '../../../modelos/superheroe.model';

export type ResultadoAltaEdicion = NuevoSuperheroe | Superheroe;

@Component({
  selector: 'app-alta-edicion-superheroe',
  imports: [MaterialModule, MayusculasDirective, ReactiveFormsModule],
  templateUrl: './alta-edicion-superheroe.component.html',
  styleUrl: './alta-edicion-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltaEdicionSuperheroeComponent {
  private readonly tamanioMaximoImagen = 5 * 1024 * 1024;
  private readonly constructorFormulario = inject(FormBuilder);
  private readonly modal = inject(
    MatDialogRef<AltaEdicionSuperheroeComponent, ResultadoAltaEdicion>,
  );
  public readonly superheroe = inject<Superheroe | null>(MAT_DIALOG_DATA);
  public readonly esEdicion = this.superheroe !== null;
  public readonly vistaPreviaImagen = signal(this.superheroe?.urlImagen ?? '');
  public readonly errorImagen = signal('');
  public readonly formulario = this.constructorFormulario.group({
    nombre: [this.superheroe?.nombre ?? '', Validators.required],
    edad: [this.superheroe?.edad ?? null, [Validators.required, Validators.min(0)]],
    altura: [this.superheroe?.altura ?? null, [Validators.required, Validators.min(0.1)]],
    urlImagen: [this.superheroe?.urlImagen ?? '', Validators.required],
    descripcion: [this.superheroe?.descripcion ?? '', Validators.required],
  });

  public seleccionarImagen(evento: Event): void {
    const selector = evento.target as HTMLInputElement;
    const archivo = selector.files?.[0];

    if (!archivo) {
      return;
    }

    if (!archivo.type.startsWith('image/')) {
      this.errorImagen.set('El archivo seleccionado debe ser una imagen.');
      selector.value = '';
      return;
    }

    if (archivo.size > this.tamanioMaximoImagen) {
      this.errorImagen.set('La imagen no puede superar los 5 MB.');
      selector.value = '';
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      const imagen = lector.result;

      if (typeof imagen === 'string') {
        this.formulario.controls.urlImagen.setValue(imagen);
        this.formulario.controls.urlImagen.markAsDirty();
        this.vistaPreviaImagen.set(imagen);
        this.errorImagen.set('');
      }
    };

    lector.onerror = () => {
      this.errorImagen.set('No fue posible leer la imagen seleccionada.');
    };

    lector.readAsDataURL(archivo);
  }

  public guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datosFormulario = this.formulario.getRawValue();
    const resultado = this.superheroe
      ? { id: this.superheroe.id, ...datosFormulario }
      : datosFormulario;
    this.modal.close(resultado);
  }
}
