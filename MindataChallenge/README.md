# MindataChallenge

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Docker

Build the production image:

```bash
docker build -t mindata-challenge .
```

Run the container and open `http://localhost:8080`:

```bash
docker run --rm -p 8080:80 --name mindata-challenge mindata-challenge
```

The image uses Node.js only during compilation. The final image serves the generated static files with Nginx and supports Angular client-side routes.

### Docker Compose

Build and start the application in the background:

```bash
docker compose up --build -d
```

By default, Docker Compose maps port `8080` on the host to port `80` in the container (`8080:80`). After starting it, access the application at:

```text
http://localhost:8080
```

The host port can be changed through the `APP_PORT` environment variable. For example:

```bash
APP_PORT=4200 docker compose up --build -d
```

On PowerShell, set the port with:

```powershell
$env:APP_PORT = 4200
docker compose up --build -d
```

Check its status and stop it with:

```bash
docker compose ps
docker compose down
```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
