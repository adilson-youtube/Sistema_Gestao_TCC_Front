import { Injectable } from '@angular/core';
import { EstudanteRepositorio } from '../repositorios/estudanterepositorio.service';
import { Observable } from 'rxjs';
import { Estudante } from '../modelo/entidades/estudante';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  constructor(private repositorio: EstudanteRepositorio) { }

  //-- Estudante
  listarEstudantes(): Observable<Array<Estudante>> {
        return this.repositorio.listarEstudantes();
    }

  //-- Estudante
  ListarEstudantesTFCsFinalizados(): Observable<Array<Estudante>> {
        return this.repositorio.ListarEstudantesTFCsFinalizados();
    }

    procurarEstudantePorId(codigo: number): Observable<Estudante> {
        return this.repositorio.procurarEstudantePorId(codigo);
    }
  
    salvarEstudante(estudante: Estudante): Observable<Estudante> {
        return this.repositorio.salvarEstudante(estudante);
    }
  
    actualizarEstudante(id: number, estudante: Estudante): Observable<Estudante> {
        return this.repositorio.actualizarEstudante(id, estudante);
    }
  
    eliminarEstudante(id: number): Observable<Estudante> {
        return this.repositorio.eliminarEstudante(id);
    }

}
