import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

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
  public readonly filtroNombre = signal('');
  public readonly superheroes = computed(() =>
    this.servicioSuperheroes.consultarPorNombre(this.filtroNombre()),
  );

  public actualizarFiltro(evento: Event): void {
    const campoBusqueda = evento.target as HTMLInputElement;
    this.filtroNombre.set(campoBusqueda.value);
  }

  public limpiarFiltro(): void {
    this.filtroNombre.set('');
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
          this.servicioSuperheroes.registrar(resultado);
        }
      });
  }

  private esSuperheroeExistente(resultado: ResultadoAltaEdicion): resultado is Superheroe {
    return 'id' in resultado;
  }
}
