import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cargo } from '../modelo/entidades/cargo';
import { environment } from 'src/environments/environment';
import { Funcionario } from '../modelo/entidades/funcionario';
import { ValorDeIndice } from '../modelo/entidades/valorDeIndice';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioRepositorio {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.funcionarioUrl}/`;
    }

//--- cargo -----
    procurarCargoPorId(id: number): Observable<Cargo> {
        const path = `cargo/${id}`;
        return this.http.get<Cargo>(`${this.baseUrl}${path}`);
    }

//--- valor de indice -----
    procurarValorDeIndicePorId(id: number): Observable<ValorDeIndice> {
        const path = `valordeindice/${id}`;
        return this.http.get<ValorDeIndice>(`${this.baseUrl}${path}`);
    }
    
//--- funcionario -----
    listarFuncionarios(): Observable<Array<Funcionario>> {
        const path = `funcionario`;
        return this.http.get<Array<Funcionario>>(`${this.baseUrl}${path}`);
    }

    procurarFuncionarioPorNip(nip: string): Observable<Funcionario> {
        const path = `funcionario/${nip}`;
        return this.http.get<Funcionario>(`${this.baseUrl}${path}`);
    }

    /*salvarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
        const path = `funcionario`;
        return this.http.post<Funcionario>(`${this.baseUrl}${path}`, funcionario);
    }*/

    
//------
}