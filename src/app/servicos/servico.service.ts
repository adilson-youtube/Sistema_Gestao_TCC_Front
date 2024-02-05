import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { Area } from '../modelo/entidades/area';
import { Orgao } from '../modelo/entidades/orgao';
import { Contacto } from '../modelo/entidades/contacto';
import { Repositorio } from '../repositorios/repositorio.service';

@Injectable({
  providedIn: 'root'
})
export class Servico {

    constructor(private repositorio: Repositorio) { }

    //--Contacto
   /* listarContactos(): Observable<Array<Contacto>> {
        return this.repositorio.listarContactos();
    }

    procurarContactoPorId(id: number): Observable<Contacto> {
        return this.repositorio.procurarContactoPorId(id);
    }

    salvarContacto(contacto: Contacto): Observable<Contacto> {
        return this.repositorio.salvarContacto(contacto);
    }

    eliminarContacto(id: number): Observable<Contacto> {
        return this.repositorio.eliminarContacto(id);
    }*/

    //-- Órgão
    listarOrgaos(): Observable<Array<Orgao>> {
        return this.repositorio.listarOrgaos();
    }

    procurarOrgaoPorId(id: number): Observable<Orgao> {
        return this.repositorio.procurarOrgaoPorId(id);
    }

    salvarOrgao(orgao: Orgao): Observable<Orgao> {
        return this.repositorio.salvarOrgao(orgao);
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

    eliminarArea(id: number): Observable<Area> {
        return this.repositorio.eliminarArea(id);
    }
    
  //--Dados de Uso
   /* salvarDadosDeUso(dadosDeUso: DadosDeUso): void {
        this.repositorio.salvarDadosDeUso(dadosDeUso).subscribe(_result => {});
    }*/
}
