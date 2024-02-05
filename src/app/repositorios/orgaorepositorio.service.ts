import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Area } from '../modelo/entidades/area';
import { Orgao } from '../modelo/entidades/orgao';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrgaoRepositorio {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.orgaoUrl}`;
  }

//--- Órgão -------
  listarOrgaos(): Observable<Array<Orgao>> {
    const path = `orgaos`;
    return this.http.get<Array<Orgao>>(`${this.baseUrl}${path}`);
  }

  procurarOrgaoPorId(id: number): Observable<Orgao> {
    const path = `orgaos/${id}`;
    return this.http.get<Orgao>(`${this.baseUrl}${path}`);
  }

//--- Área ------
  salvarArea(area: Area): Observable<Area> {
    const path = `areas`;
    return this.http.post<Area>(`${this.baseUrl}${path}`, area);
  }

  listarAreas(): Observable<Array<Area>> {
    const path = `areas`;
    return this.http.get<Array<Area>>(`${this.baseUrl}${path}`);
  }

  procurarAreaPorId(id: number): Observable<Area> {
    const path = `areas/${id}`;
    return this.http.get<Area>(`${this.baseUrl}${path}`);
  }

  procurarAreasPorOrgao(id: number): Observable<Array<Area>> {
    const path = `areas/orgao/${id}`;
    return this.http.get<Array<Area>>(`${this.baseUrl}${path}`);
  }   
//---
}
