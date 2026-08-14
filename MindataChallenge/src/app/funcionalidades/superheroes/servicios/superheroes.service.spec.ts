import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NuevoSuperheroe, Superheroe } from '../modelos/superheroe.model';
import { ServicioSuperheroes } from './superheroes.service';

describe('ServicioSuperheroes', () => {
  const superheroe: Superheroe = {
    id: 1,
    nombre: 'Spiderman',
    edad: 23,
    altura: 1.78,
    urlImagen: '/spiderman.webp',
    descripcion: 'Héroe arácnido',
  };
  let servicio: ServicioSuperheroes;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioSuperheroes, provideHttpClient(), provideHttpClientTesting()],
    });

    servicio = TestBed.inject(ServicioSuperheroes);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('consulta todos los superhéroes y actualiza el estado', () => {
    servicio.consultarTodos().subscribe((resultado) => expect(resultado).toEqual([superheroe]));

    http.expectOne('api/superheroes').flush([superheroe]);

    expect(servicio.superheroes()).toEqual([superheroe]);
  });

  it('conserva el último estado si falla la consulta de todos los superhéroes', () => {
    servicio.consultarTodos().subscribe();
    http.expectOne('api/superheroes').flush([superheroe]);

    servicio
      .consultarTodos()
      .subscribe((resultado) => expect(resultado).toEqual([superheroe]));
    http
      .expectOne('api/superheroes')
      .flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(servicio.superheroes()).toEqual([superheroe]);
  });

  it('consulta un superhéroe por id y devuelve null si no existe', () => {
    servicio.consultarPorId(1).subscribe((resultado) => expect(resultado).toEqual(superheroe));
    http.expectOne('api/superheroes/1').flush(superheroe);

    servicio.consultarPorId(99).subscribe((resultado) => expect(resultado).toBeNull());
    http.expectOne('api/superheroes/99').flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('consulta por coincidencia de nombre', () => {
    servicio.consultarPorNombre(' man ').subscribe();

    const peticion = http.expectOne(
      (request) => request.url === 'api/superheroes' && request.params.get('nombre') === 'man',
    );
    peticion.flush([superheroe]);

    expect(servicio.superheroes()).toEqual([superheroe]);
  });

  it('conserva el último estado si falla la consulta por nombre', () => {
    servicio.consultarTodos().subscribe();
    http.expectOne('api/superheroes').flush([superheroe]);

    servicio
      .consultarPorNombre('Spider')
      .subscribe((resultado) => expect(resultado).toEqual([superheroe]));
    http
      .expectOne((request) => request.params.get('nombre') === 'Spider')
      .flush(null, { status: 500, statusText: 'Internal Server Error' });

    expect(servicio.superheroes()).toEqual([superheroe]);
  });

  it('registra un superhéroe y lo agrega al estado', () => {
    const { id, ...nuevo } = superheroe;

    servicio.registrar(nuevo).subscribe((resultado) => expect(resultado).toEqual(superheroe));

    const peticion = http.expectOne('api/superheroes');
    expect(peticion.request.method).toBe('POST');
    expect(peticion.request.body).toEqual(nuevo satisfies NuevoSuperheroe);
    peticion.flush(superheroe);

    expect(servicio.superheroes()).toEqual([superheroe]);
  });

  it('modifica un superhéroe existente en el estado', () => {
    const modificado = { ...superheroe, nombre: 'Peter Parker' };
    servicio.consultarTodos().subscribe();
    http.expectOne('api/superheroes').flush([superheroe]);

    servicio
      .modificarSuperheroe(modificado)
      .subscribe((resultado) => expect(resultado).toEqual(modificado));
    const peticion = http.expectOne('api/superheroes/1');
    expect(peticion.request.method).toBe('PUT');
    peticion.flush(null);

    expect(servicio.superheroes()).toEqual([modificado]);
  });

  it('elimina un superhéroe existente del estado', () => {
    servicio.consultarTodos().subscribe();
    http.expectOne('api/superheroes').flush([superheroe]);

    servicio.eliminarSuperheroe(1).subscribe((eliminado) => expect(eliminado).toBe(true));
    const peticion = http.expectOne('api/superheroes/1');
    expect(peticion.request.method).toBe('DELETE');
    peticion.flush(null);

    expect(servicio.superheroes()).toEqual([]);
  });
});
