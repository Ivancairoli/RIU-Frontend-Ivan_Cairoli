export interface Superheroe {
  readonly id: number;
  readonly nombre: string;
  readonly edad: number;
  readonly altura: number;
  readonly urlImagen: string;
  readonly descripcion: string;
}

export type NuevoSuperheroe = Omit<Superheroe, 'id'>;
