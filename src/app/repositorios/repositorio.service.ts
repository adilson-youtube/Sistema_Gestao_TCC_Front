import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Area } from '../modelo/entidades/area';
import { Orgao } from '../modelo/entidades/orgao';
import { Contacto } from '../modelo/entidades/contacto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Repositorio {
    baseUrl: string;

    constructor(private http: HttpClient) {
      this.baseUrl = `${environment.orgaoUrl}`;
    }

    //--Contactos
   /* listarContactos(): Observable<Array<Contacto>> {
      const path = `contactos`;
      return this.http.get<Array<Contacto>>(`${this.baseUrl}${path}`);
    }
  
    procurarContactoPorId(id: number): Observable<Contacto> {
      const path = `contactos/${id}`;
      return this.http.get<Contacto>(`${this.baseUrl}${path}`);
    }
  
    salvarContacto(contacto: Contacto): Observable<Contacto> {
      const path = `contactos`;
      return this.http.post<Contacto>(`${this.baseUrl}${path}`, contacto);
    }
  
    eliminarContacto(id: number): Observable<Contacto> {
      const path = `contactos/${id}`;
      return this.http.delete<Contacto>(`${this.baseUrl}${path}`);
    }*/
  
    //---órgão
    listarOrgaos(): Observable<Array<Orgao>> {
      const path = `orgaos`;
      return this.http.get<Array<Orgao>>(`${this.baseUrl}${path}`);
    }

    procurarOrgaoPorId(id: number): Observable<Orgao> {
      const path = `orgaos/${id}`;
      return this.http.get<Orgao>(`${this.baseUrl}${path}`);
    }
  
    salvarOrgao(orgao: Orgao): Observable<Orgao> {
      const path = `orgaos`;
      return this.http.post<Orgao>(`${this.baseUrl}${path}`, orgao);
    }

    //--- Área
    listarAreas(): Observable<Array<Area>> {
      const path = `areas`;
      return this.http.get<Array<Area>>(`${this.baseUrl}${path}`);
    }
  
    procurarAreasPorOrgao(id: number): Observable<Array<Area>> {
      const path = `areas/orgao/${id}`;
      return this.http.get<Array<Area>>(`${this.baseUrl}${path}`);
    }
  
    procurarAreaPorId(id: number): Observable<Area> {
      const path = `areas/${id}`;
      return this.http.get<Area>(`${this.baseUrl}${path}`);
    }
  
    salvarArea(area: Area): Observable<Area> {
      const path = `areas`;
      return this.http.post<Area>(`${this.baseUrl}${path}`, area);
    }
 
    eliminarArea(id: number): Observable<Area> {
      const path = `areas/${id}`;
      return this.http.delete<Area>(`${this.baseUrl}${path}`);
    }
    
    //---Uso de Dados
   /* salvarDadosDeUso(dadosDeUso: DadosDeUso): Observable<DadosDeUso> {
      const path = `dadosdeuso`;
      return this.http.post<DadosDeUso>(`${this.baseUrl}${path}`, dadosDeUso);
    }*/
    
}
