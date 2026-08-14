import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { NuevoSuperheroe, Superheroe } from '../modelos/superheroe.model';
import { IAdministrarSuperheroes } from './interfaces/administrar-superheroes.interface';

@Injectable({ providedIn: 'root' })
export class ServicioSuperheroes implements IAdministrarSuperheroes {
  private readonly http = inject(HttpClient);
  private readonly urlApi = 'api/superheroes';
  private readonly estadoSuperheroes = signal<readonly Superheroe[]>([]);

  readonly superheroes = this.estadoSuperheroes.asReadonly();

  public registrar(nuevoSuperheroe: NuevoSuperheroe): Observable<Superheroe> {
    return this.http
      .post<Superheroe>(this.urlApi, nuevoSuperheroe)
      .pipe(
        tap((registrado) =>
          this.estadoSuperheroes.update((superheroes) => [...superheroes, registrado]),
        ),
      );
  }

  public consultarTodos(): Observable<readonly Superheroe[]> {
    return this.http
      .get<Superheroe[]>(this.urlApi)
      .pipe(
        tap((superheroes) => this.estadoSuperheroes.set(superheroes)),
        catchError(() => of(this.estadoSuperheroes())),
      );
  }

  public consultarPorId(id: number): Observable<Superheroe | null> {
    return this.http
      .get<Superheroe>(`${this.urlApi}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) =>
          error.status === 404 ? of(null) : throwError(() => error),
        ),
      );
  }

  public consultarPorNombre(nombre: string): Observable<readonly Superheroe[]> {
    const parametros = new HttpParams().set('nombre', nombre.trim());

    return this.http
      .get<Superheroe[]>(this.urlApi, { params: parametros })
      .pipe(
        tap((superheroes) => this.estadoSuperheroes.set(superheroes)),
        catchError(() => of(this.estadoSuperheroes())),
      );
  }

  public modificarSuperheroe(superheroe: Superheroe): Observable<Superheroe | null> {
    return this.http.put<void>(`${this.urlApi}/${superheroe.id}`, superheroe).pipe(
      map(() => superheroe),
      tap((modificado) =>
        this.estadoSuperheroes.update((superheroes) =>
          superheroes.map((actual) => (actual.id === modificado.id ? modificado : actual)),
        ),
      ),
      catchError((error: HttpErrorResponse) =>
        error.status === 404 ? of(null) : throwError(() => error),
      ),
    );
  }

  public eliminarSuperheroe(id: number): Observable<boolean> {
    return this.http.delete<void>(`${this.urlApi}/${id}`).pipe(
      tap(() =>
        this.estadoSuperheroes.update((superheroes) =>
          superheroes.filter((superheroe) => superheroe.id !== id),
        ),
      ),
      map(() => true),
      catchError((error: HttpErrorResponse) =>
        error.status === 404 ? of(false) : throwError(() => error),
      ),
    );
  }
}
