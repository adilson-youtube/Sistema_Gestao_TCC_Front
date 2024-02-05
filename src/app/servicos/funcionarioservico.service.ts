import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Cargo } from '../modelo/entidades/cargo';
import { Funcionario } from '../modelo/entidades/funcionario';
import { ValorDeIndice } from '../modelo/entidades/valorDeIndice';
import { FuncionarioRepositorio } from '../repositorios/funcionariorepositorio.service';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioServico {

    constructor(private repositorio: FuncionarioRepositorio) { }

//--- cargo -----
    procurarCargoPorId(id: number): Observable<Cargo> {
        return this.repositorio.procurarCargoPorId(id);
    }

//--- valor de indice -----
    procurarValorDeIndicePorId(id: number): Observable<ValorDeIndice> {
        return this.repositorio.procurarValorDeIndicePorId(id);
    }
  
//--- funcionario -----
    listarFuncionarios(): Observable<Array<Funcionario>> {
        return this.repositorio.listarFuncionarios();
    }

    procurarFuncionarioPorNip(nip: string): Observable<Funcionario> {
        return this.repositorio.procurarFuncionarioPorNip(nip);
    }
//------
}