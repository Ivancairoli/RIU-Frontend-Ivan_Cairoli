import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
  private readonly snackBar = inject(MatSnackBar);

  public exito(mensaje: string): void {
    this.mostrar(mensaje, 'toast-exito');
  }

  public error(mensaje: string): void {
    this.mostrar(mensaje, 'toast-error');
  }

  private mostrar(mensaje: string, clase: string): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [clase],
    });
  }
}
