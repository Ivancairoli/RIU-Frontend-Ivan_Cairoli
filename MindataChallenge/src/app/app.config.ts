import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { interceptorCarga } from './compartido/interceptores/carga.interceptor';
import { ApiSuperheroesSimuladaService } from './funcionalidades/superheroes/datos/api-superheroes-simulada.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([interceptorCarga])),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(ApiSuperheroesSimuladaService, {
        dataEncapsulation: false,
        delay: 800,
        passThruUnknownUrl: true,
      }),
    ),
    provideRouter(routes),
  ],
};
