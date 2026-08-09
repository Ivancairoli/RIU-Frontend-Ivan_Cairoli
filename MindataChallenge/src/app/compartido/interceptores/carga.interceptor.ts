import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ServicioCarga } from '../servicios/carga.service';

export const interceptorCarga: HttpInterceptorFn = (peticion, siguiente) => {
  const servicioCarga = inject(ServicioCarga);
  servicioCarga.iniciar();

  return siguiente(peticion).pipe(finalize(() => servicioCarga.finalizar()));
};
