import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, startWith, Subject, switchMap, take } from 'rxjs';

import { MaterialModule } from '../../../../compartido/material/material.module';
import { Superheroe } from '../../modelos/superheroe.model';
import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import {
  AltaEdicionSuperheroeComponent,
  ResultadoAltaEdicion,
} from '../modales/alta-edicion-superheroe/alta-edicion-superheroe.component';
import { TarjetaSuperheroeComponent } from '../tarjeta-superheroe/tarjeta-superheroe.component';

@Component({
  selector: 'app-lista-superheroes',
  imports: [MaterialModule, TarjetaSuperheroeComponent],
  templateUrl: './lista-superheroes.component.html',
  styleUrl: './lista-superheroes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaSuperheroesComponent {
  private readonly servicioSuperheroes = inject(ServicioSuperheroes);
  private readonly modal = inject(MatDialog);
  private readonly cambiosFiltro = new Subject<string>();

  public readonly filtroNombre = signal('');
  public readonly superheroes = this.servicioSuperheroes.superheroes;

  constructor() {
    this.cambiosFiltro
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((nombre) =>
          nombre
            ? this.servicioSuperheroes.consultarPorNombre(nombre)
            : this.servicioSuperheroes.consultarTodos(),
        ),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  public actualizarFiltro(evento: Event): void {
    const campoBusqueda = evento.target as HTMLInputElement;
    this.filtroNombre.set(campoBusqueda.value);
    this.cambiosFiltro.next(campoBusqueda.value);
  }

  public limpiarFiltro(): void {
    this.filtroNombre.set('');
    this.cambiosFiltro.next('');
  }

  public abrirModalCreacion(): void {
    const referenciaModal = this.modal.open<
      AltaEdicionSuperheroeComponent,
      null,
      ResultadoAltaEdicion
    >(AltaEdicionSuperheroeComponent, { data: null });

    referenciaModal
      .afterClosed()
      .pipe(take(1))
      .subscribe((resultado) => {
        if (resultado && !this.esSuperheroeExistente(resultado)) {
          this.servicioSuperheroes.registrar(resultado).pipe(take(1)).subscribe();
        }
      });
  }

  private esSuperheroeExistente(resultado: ResultadoAltaEdicion): resultado is Superheroe {
    return 'id' in resultado;
  }
}
