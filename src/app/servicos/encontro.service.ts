import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encontro } from '../modelo/entidades/encontro';
import { EncontroRepositorio } from '../repositorios/encontrorepositorio.service';

@Injectable({
  providedIn: 'root'
})
export class EncontroService {

  constructor(private repositorio: EncontroRepositorio) { }

  //-- Encontro
  listarEncontros(): Observable<Array<Encontro>> {
        return this.repositorio.listarEncontros();
    }

    listarEncontrosTFC(id: number): Observable<Array<Encontro>> {
        return this.repositorio.listarEncontrosTFC(id);
    }

    listarEncontrosEstudante(id: number): Observable<Array<Encontro>> {
        return this.repositorio.listarEncontrosEstudante(id);
    }

    procurarEncontroPorId(codigo: number): Observable<Encontro> {
        return this.repositorio.procurarEncontroPorId(codigo);
    }
  
    salvarEncontro(estudante: Encontro): Observable<Encontro> {
        return this.repositorio.salvarEncontro(estudante);
    }
  
    actualizarEncontro(id: number, estudante: Encontro): Observable<Encontro> {
        return this.repositorio.actualizarEncontro(id, estudante);
    }
  
    eliminarEncontro(id: number): Observable<Encontro> {
        return this.repositorio.eliminarEncontro(id);
    }

}
