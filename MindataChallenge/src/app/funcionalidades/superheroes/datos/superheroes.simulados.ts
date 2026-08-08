import { Superheroe } from '../modelos/superheroe.model';

export const SUPERHEROES_SIMULADOS: readonly Superheroe[] = [
  {
    id: 1,
    nombre: 'Spiderman',
    edad: 23,
    altura: 1.78,
    urlImagen: '/imagenes/superheroes/spiderman.png',
    descripcion:
      'Un joven héroe ágil y valiente que protege Nueva York usando sus habilidades arácnidas y su ingenio.',
  },
  {
    id: 2,
    nombre: 'Iron Man',
    edad: 48,
    altura: 1.85,
    urlImagen: '/imagenes/superheroes/iron-man.png',
    descripcion:
      'Inventor brillante y filántropo que combate las amenazas más peligrosas con una avanzada armadura tecnológica.',
  },
  {
    id: 3,
    nombre: 'Thor',
    edad: 1_500,
    altura: 1.98,
    urlImagen: '/imagenes/superheroes/Thor.png',
    descripcion:
      'Dios asgardiano del trueno, protector de los nueve reinos y portador de un poder digno de las grandes leyendas.',
  },
  {
    id: 4,
    nombre: 'Hulk',
    edad: 49,
    altura: 2.44,
    urlImagen: '/imagenes/superheroes/hulk.png',
    descripcion:
      'La fuerza imparable del científico Bruce Banner, capaz de superar cualquier límite cuando la situación lo exige.',
  },
  {
    id: 5,
    nombre: 'Black Widow',
    edad: 35,
    altura: 1.7,
    urlImagen: '/imagenes/superheroes/black-widow.png',
    descripcion:
      'Espía experta y estratega excepcional que enfrenta cada misión con precisión, coraje y gran capacidad táctica.',
  },
];
