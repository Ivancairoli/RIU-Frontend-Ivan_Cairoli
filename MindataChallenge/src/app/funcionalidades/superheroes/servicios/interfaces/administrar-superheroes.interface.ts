import { Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { NuevoSuperheroe, Superheroe } from '../../modelos/superheroe.model';

export interface IAdministrarSuperheroes {
  readonly superheroes: Signal<readonly Superheroe[]>;

  registrar(nuevoSuperheroe: NuevoSuperheroe): Observable<Superheroe>;

  consultarTodos(): Observable<readonly Superheroe[]>;

  consultarPorId(id: number): Observable<Superheroe | null>;

  consultarPorNombre(nombre: string): Observable<readonly Superheroe[]>;

  modificarSuperheroe(superheroe: Superheroe): Observable<Superheroe | null>;

  eliminarSuperheroe(id: number): Observable<boolean>;
}
