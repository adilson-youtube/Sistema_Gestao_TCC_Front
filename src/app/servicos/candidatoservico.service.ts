import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Candidato } from '../modelo/entidades/candidato';
import { CandidatoRepositorio } from '../repositorios/candidatorepositorio.service';


@Injectable({
  providedIn: 'root'
})
export class CandidatoServico {

    constructor(private repositorio: CandidatoRepositorio) { }

//--- candidato -----
    listarCandidatos(): Observable<Array<Candidato>> {
        return this.repositorio.listarCandidatos();
    }

    salvarCandidato(candidato: Candidato): Observable<Candidato> {
        return this.repositorio.salvarCandidato(candidato);
    }

    procurarCandidatoPorCodigo(codigo: string): Observable<Candidato> {
        return this.repositorio.procurarCandidatoPorCodigo(codigo);
    }

//------
}
