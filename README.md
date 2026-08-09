Proyecto en Angular 21:

Utiliza:

Angular 21
Angular Material
Signals
RXJS
Formularios Reactivos
Angular-In-Memory-Web-API

Versión de node utilizada:

20.19.2

Versión de NPM utilizada:

10.8.2

Testing utilizando Jasmine Karma

Aclaración sobre el scaffolding:

El proyecto está organizado por funcionalidades y responsabilidades. La funcionalidad principal de superhéroes se encuentra aislada como un módulo de los elementos compartidos.

Los elementos compartidos hacen referencia a cosas que se podrían utilizar entre módulos pero en este proyecto solamente se cuenta con 1 solo módulo y es el de gestión de superheroes.

En una funcionalidad suelo colocar 4 carpetas generalmente haciendo referencia:

Componentes: Contiene los componentes del módulo específico
Servicios: Contiene el/los servicios que posea ese módulo específico
Modelos: todos los modelos utilizados en ese modulo
Datos: Archivos para mockeo del modulo

y una carpeta generalmente llamada views o vistas (este proyecto no la posee) que guarda especificamente la vista principal en caso de que dicha vista redirija a otros submodulos.

Para levantar el aplicativo con docker:

1) docker compose up -d
