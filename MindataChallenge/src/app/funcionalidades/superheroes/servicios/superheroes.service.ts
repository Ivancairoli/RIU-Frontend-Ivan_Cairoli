import { Injectable, signal } from '@angular/core';
import { SUPERHEROES_SIMULADOS } from '../datos/superheroes.simulados';
import { IAdministrarSuperheroes } from './interfaces/administrar-superheroes.interface';
import { NuevoSuperheroe, Superheroe } from '../modelos/superheroe.model';

@Injectable({ providedIn: 'root' })
export class ServicioSuperheroes implements IAdministrarSuperheroes {
  private readonly estadoSuperheroes = signal<readonly Superheroe[]>(SUPERHEROES_SIMULADOS);
  readonly superheroes = this.estadoSuperheroes.asReadonly();

  public registrar(nuevoSuperheroe: NuevoSuperheroe): Superheroe {
    const superheroeRegistrado: Superheroe = {
      id: this.obtenerSiguienteId(),
      ...nuevoSuperheroe,
    };
    this.estadoSuperheroes.update((superheroes) => [...superheroes, superheroeRegistrado]);
    return superheroeRegistrado;
  }

  public consultarTodos(): readonly Superheroe[] {
    return this.estadoSuperheroes();
  }

  public consultarPorId(id: number): Superheroe | null {
    return this.estadoSuperheroes().find((superheroe) => superheroe.id === id) ?? null;
  }

  public consultarPorNombre(nombre: string): readonly Superheroe[] {
    const nombreBuscado = this.normalizarTexto(nombre.trim());
    return this.estadoSuperheroes().filter((superheroe) =>
      this.normalizarTexto(superheroe.nombre).includes(nombreBuscado),
    );
  }

  public modificarSuperheroe(superheroe: Superheroe): Superheroe | null {
    if (!this.consultarPorId(superheroe.id)) {
      return null;
    }
    this.estadoSuperheroes.update((superheroes) =>
      superheroes.map((actual) => (actual.id === superheroe.id ? superheroe : actual)),
    );
    return superheroe;
  }

  public eliminarSuperheroe(id: number): boolean {
    if (!this.consultarPorId(id)) {
      return false;
    }
    this.estadoSuperheroes.update((superheroes) =>
      superheroes.filter((superheroe) => superheroe.id !== id),
    );
    return true;
  }

  private obtenerSiguienteId(): number {
    const ids = this.estadoSuperheroes().map((superheroe) => superheroe.id);
    return Math.max(0, ...ids) + 1;
  }

  private normalizarTexto(texto: string): string {
    return texto
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLocaleLowerCase('es');
  }
}
