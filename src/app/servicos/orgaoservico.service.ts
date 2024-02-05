import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Area } from '../modelo/entidades/area';
import { Orgao } from '../modelo/entidades/orgao';
import { OrgaoRepositorio } from '../repositorios/orgaorepositorio.service';


@Injectable({
  providedIn: 'root'
})
export class OrgaoServico {

    constructor(private repositorio: OrgaoRepositorio) { }

//-- Órgão
    listarOrgaos(): Observable<Array<Orgao>> {
        return this.repositorio.listarOrgaos();
    }

    procurarOrgaoPorId(id: number): Observable<Orgao> {
        return this.repositorio.procurarOrgaoPorId(id);
    }

//-- Área
    procurarAreaPorId(id: number): Observable<Area> {
        return this.repositorio.procurarAreaPorId(id);
    }

    listarAreas(): Observable<Array<Area>> {
        return this.repositorio.listarAreas();
    }

    procurarAreasPorOrgao(id: number): Observable<Array<Area>> {
        return this.repositorio.procurarAreasPorOrgao(id);
    }

    salvarArea(area: Area): Observable<Area> {
        return this.repositorio.salvarArea(area);
    }

//-----
}
