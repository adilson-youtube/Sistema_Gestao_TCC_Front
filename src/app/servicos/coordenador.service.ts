import { Injectable } from '@angular/core';
import { CoordenadorReopsitorio } from '../repositorios/coordenadorreopsitorio.service';
import { Observable } from 'rxjs';
import { Coordenador } from '../modelo/entidades/coordenador';

@Injectable({
  providedIn: 'root'
})
export class CoordenadorService {

  constructor(private repositorio: CoordenadorReopsitorio) { }

  //-- Coordenador
  listarCoordenadores(): Observable<Array<Coordenador>> {
        return this.repositorio.listarCoordenadores();
    }

    procurarCoordenadorPorId(codigo: number): Observable<Coordenador> {
        return this.repositorio.procurarCoordenadorPorId(codigo);
    }
  
    salvarCoordenador(estudante: Coordenador): Observable<Coordenador> {
        return this.repositorio.salvarCoordenador(estudante);
    }
  
    actualizarCoordenador(id: number, estudante: Coordenador): Observable<Coordenador> {
        return this.repositorio.actualizarCoordenador(id, estudante);
    }
  
    eliminarCoordenador(id: number): Observable<Coordenador> {
        return this.repositorio.eliminarCoordenador(id);
    }

}
