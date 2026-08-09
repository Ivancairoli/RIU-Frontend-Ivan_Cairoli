import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ServicioCarga {
  private readonly solicitudesActivas = signal(0);
  readonly estaCargando = computed(() => this.solicitudesActivas() > 0);

  public iniciar(): void {
    this.solicitudesActivas.update((cantidad) => cantidad + 1);
  }

  public finalizar(): void {
    this.solicitudesActivas.update((cantidad) => Math.max(0, cantidad - 1));
  }
}
