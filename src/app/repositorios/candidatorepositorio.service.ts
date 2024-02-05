import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Candidato } from '../modelo/entidades/candidato';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CandidatoRepositorio {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${environment.candidatoUrl}/`;
    }


//--- candidato -----
    listarCandidatos(): Observable<Array<Candidato>> {
        const path = `candidato`;
        return this.http.get<Array<Candidato>>(`${this.baseUrl}${path}`);
    }

    salvarCandidato(candidato: Candidato): Observable<Candidato> {
        const path = `candidato`;
        return this.http.post<Candidato>(`${this.baseUrl}${path}`, candidato);
    }

    procurarCandidatoPorCodigo(codigo: string): Observable<Candidato> {
        const path = `candidato/${codigo}`;
        return this.http.get<Candidato>(`${this.baseUrl}${path}`);
    }

//------
}
