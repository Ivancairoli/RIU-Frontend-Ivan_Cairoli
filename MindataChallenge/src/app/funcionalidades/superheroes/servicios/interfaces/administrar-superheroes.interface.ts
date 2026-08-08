import { Signal } from '@angular/core';
import { NuevoSuperheroe, Superheroe } from '../../modelos/superheroe.model';

export interface IAdministrarSuperheroes {
  readonly superheroes: Signal<readonly Superheroe[]>;

  registrar(nuevoSuperheroe: NuevoSuperheroe): Superheroe;

  consultarTodos(): readonly Superheroe[];

  consultarPorId(id: number): Superheroe | null;

  consultarPorNombre(nombre: string): readonly Superheroe[];

  modificarSuperheroe(superheroe: Superheroe): Superheroe | null;

  eliminarSuperheroe(id: number): boolean;
}
