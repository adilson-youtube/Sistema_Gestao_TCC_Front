import { Injectable } from '@angular/core';
import { Anexo } from '../modelo/entidades/Anexo';
import { AnexoRepositorio } from '../repositorios/anexorepositorio.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnexoService {

  constructor(private repositorio: AnexoRepositorio) { }

  //-- Anexo
  listarAnexos(): Observable<Array<Anexo>> {
        return this.repositorio.listarAnexos();
    }

    procurarAnexoPorId(codigo: number): Observable<Anexo> {
        return this.repositorio.procurarAnexoPorId(codigo);
    }
  
    salvarAnexo(anexo: Anexo): Observable<Anexo> {
        return this.repositorio.salvarAnexo(anexo);
    }
  
    actualizarAnexo(id: number, anexo: Anexo): Observable<Anexo> {
        return this.repositorio.actualizarAnexo(id, anexo);
    }
  
    eliminarAnexo(id: number): Observable<Anexo> {
        return this.repositorio.eliminarAnexo(id);
    }

}
