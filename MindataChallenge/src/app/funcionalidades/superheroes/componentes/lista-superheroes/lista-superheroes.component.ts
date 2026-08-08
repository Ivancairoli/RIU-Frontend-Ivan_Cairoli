import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../../../../compartido/material/material.module';
import { ServicioSuperheroes } from '../../servicios/superheroes.service';
import { AltaEdicionSuperheroeComponent } from '../modales/alta-edicion-superheroe/alta-edicion-superheroe.component';
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
    this.modal.open(AltaEdicionSuperheroeComponent, {
      data: null,
    });
  }
}
