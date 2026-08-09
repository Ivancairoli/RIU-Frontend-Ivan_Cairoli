# Gestión de Superhéroes — Angular 21

Proyecto desarrollado con **Angular 21**, utilizando una arquitectura organizada por funcionalidades y responsabilidades.

##  Tecnologías utilizadas

* **Angular 21**
* **Angular Material**
* **Signals**
* **RxJS**
* **Reactive Forms**
* **Angular In-Memory Web API**
* **Jasmine**
* **Karma**
* **Docker**

## Versiones utilizadas

| Tecnología |   Versión |
| ---------- | --------: |
| Node.js    | `20.19.2` |
| npm        |  `10.8.2` |
| Angular    |      `21` |

##  Testing

El proyecto utiliza **Jasmine** y **Karma** para la implementación y ejecución de tests unitarios.

## Arquitectura y scaffolding

El proyecto está organizado siguiendo una estructura basada en **funcionalidades y responsabilidades**.

La funcionalidad principal de gestión de superhéroes se encuentra aislada de los elementos compartidos de la aplicación.

Los elementos compartidos (`shared`) representan componentes, servicios, utilidades u otros recursos que potencialmente podrían reutilizarse entre diferentes módulos o funcionalidades.

Actualmente, el proyecto cuenta con una única funcionalidad principal: Gestión de Superhéroes.

### Estructura de una funcionalidad

Generalmente, cada funcionalidad se organiza utilizando las siguientes carpetas:

```text
feature/
├── components/
├── services/
├── models/
├── data/
└── views/
```

#### `components`

Contiene los componentes específicos de la funcionalidad.

#### `services`

Contiene los servicios responsables de la lógica y comunicación necesaria para la funcionalidad.

#### `models`

Contiene las interfaces, tipos y modelos utilizados dentro de la funcionalidad.

#### `data`

Contiene archivos utilizados para el mockeo de datos de la funcionalidad.

#### `views`

Contiene las vistas principales de la funcionalidad, especialmente cuando una vista actúa como punto de entrada o permite navegar hacia otras secciones o submódulos.

> **Nota:** Actualmente este proyecto no requiere una carpeta `views`, por lo que no se encuentra presente en su estructura.

## Levantar entorno

### Con Docker

Para levantar la aplicación utilizando Docker, ejecutar desde la raíz del proyecto:

```bash
docker compose up -d
```

Esto iniciará los servicios definidos en el archivo `docker-compose`.

### Con NPM

Instalar las dependencias:

```bash
npm install
```

Levantar el servidor de desarrollo:

```bash
ng serve
```

Luego acceder desde el navegador a:

```text
http://localhost:4200
```

## Ejecutar tests

Para ejecutar los tests unitarios:

```bash
ng test
```
