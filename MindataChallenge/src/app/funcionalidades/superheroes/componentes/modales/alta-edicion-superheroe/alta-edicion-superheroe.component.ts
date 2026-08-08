import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MaterialModule } from '../../../../../compartido/material/material.module';
import { NuevoSuperheroe, Superheroe } from '../../../modelos/superheroe.model';

export type ResultadoAltaEdicion = NuevoSuperheroe | Superheroe;

@Component({
  selector: 'app-alta-edicion-superheroe',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './alta-edicion-superheroe.component.html',
  styleUrl: './alta-edicion-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AltaEdicionSuperheroeComponent {
  private readonly constructorFormulario = inject(FormBuilder);
  private readonly modal = inject(
    MatDialogRef<AltaEdicionSuperheroeComponent, ResultadoAltaEdicion>,
  );
  public readonly superheroe = inject<Superheroe | null>(MAT_DIALOG_DATA);
  public readonly esEdicion = this.superheroe !== null;
  public readonly formulario = this.constructorFormulario.nonNullable.group({
    nombre: [this.superheroe?.nombre ?? '', Validators.required],
    edad: [this.superheroe?.edad ?? 0, [Validators.required, Validators.min(0)]],
    altura: [this.superheroe?.altura ?? 0, [Validators.required, Validators.min(0.1)]],
    urlImagen: [this.superheroe?.urlImagen ?? '', Validators.required],
    descripcion: [this.superheroe?.descripcion ?? '', Validators.required],
  });

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
