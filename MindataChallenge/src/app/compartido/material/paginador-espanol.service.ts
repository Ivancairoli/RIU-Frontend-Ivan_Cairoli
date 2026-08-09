import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginadorEspanolService extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Elementos por página';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = (pagina: number, cantidadPagina: number, total: number): string => {
    if (total === 0 || cantidadPagina === 0) {
      return `0 de ${total}`;
    }

    const inicio = pagina * cantidadPagina;
    const fin = Math.min(inicio + cantidadPagina, total);
    return `${inicio + 1}–${fin} de ${total}`;
  };
}
