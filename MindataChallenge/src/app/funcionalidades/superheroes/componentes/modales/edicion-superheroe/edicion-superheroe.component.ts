import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Superheroe } from '../../../modelos/superheroe.model';

@Component({
  selector: 'app-edicion-superheroe',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edicion-superheroe.component.html',
  styleUrl: './edicion-superheroe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdicionSuperheroeComponent {
  private readonly constructorFormulario = inject(FormBuilder);
  private readonly ModalDeEdicion = inject(MatDialogRef<EdicionSuperheroeComponent, Superheroe>);
  public readonly superheroe = inject<Superheroe>(MAT_DIALOG_DATA);
  public readonly formulario = this.constructorFormulario.nonNullable.group({
    nombre: [this.superheroe.nombre, Validators.required],
    edad: [this.superheroe.edad, [Validators.required, Validators.min(0)]],
    altura: [this.superheroe.altura, [Validators.required, Validators.min(0.1)]],
    urlImagen: [this.superheroe.urlImagen, Validators.required],
    descripcion: [this.superheroe.descripcion, Validators.required],
  });

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.ModalDeEdicion.close({
      id: this.superheroe.id,
      ...this.formulario.getRawValue(),
    });
  }
}
