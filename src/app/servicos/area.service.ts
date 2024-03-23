import { Injectable } from '@angular/core';
import { AreaRepositorio } from '../repositorios/arearepositorio.service';
import { Area } from '../modelo/entidades/area';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private repositorio: AreaRepositorio) { }

  //-- Area
  listarAreas(): Observable<Array<Area>> {
        return this.repositorio.listarAreas();
    }

    procurarAreaPorId(codigo: number): Observable<Area> {
        return this.repositorio.procurarAreaPorId(codigo);
    }
  
    salvarArea(area: Area): Observable<Area> {
        return this.repositorio.salvarArea(area);
    }
  
    actualizarArea(id: number, area: Area): Observable<Area> {
        return this.repositorio.actualizarArea(id, area);
    }
  
    eliminarArea(id: number): Observable<Area> {
        return this.repositorio.eliminarArea(id);
    }

}