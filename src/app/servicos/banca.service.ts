import { Injectable } from '@angular/core';
import { BancaRepositorio } from '../repositorios/bancarepositorio.service';
import { Banca } from '../modelo/entidades/banca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancaService {

  constructor(private repositorio: BancaRepositorio) { }

  //-- Banca
  listarBancas(): Observable<Array<Banca>> {
        return this.repositorio.listarBancas();
    }

  listarBancasPorIdProfessor(id: number): Observable<Array<Banca>> {
        return this.repositorio.listarBancasPorIdProfessor(id);
    }

  listarBancasPorIdEstudante(id: number): Observable<Array<Banca>> {
        return this.repositorio.listarBancasPorIdEstudante(id);
    }

    procurarBancaPorId(codigo: number): Observable<Banca> {
        return this.repositorio.procurarBancaPorId(codigo);
    }
  
    salvarBanca(banca: Banca): Observable<Banca> {
        return this.repositorio.salvarBanca(banca);
    }
  
    actualizarBanca(id: number, banca: Banca): Observable<Banca> {
        return this.repositorio.actualizarBanca(id, banca);
    }
  
    eliminarBanca(id: number): Observable<Banca> {
        return this.repositorio.eliminarBanca(id);
    }

}
