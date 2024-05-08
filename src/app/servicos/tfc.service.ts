import { Injectable } from '@angular/core';
import { TFCRepositorio } from '../repositorios/tfcrepositorio.service';
import { TFC } from '../modelo/entidades/tfc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TFCService {

  constructor(private repositorio: TFCRepositorio) { }

  //-- TFC
  reportTFCs(): Observable<Blob> {
        return this.repositorio.reportTFCs();
    }

  //-- TFC
  listarTFCs(): Observable<Array<TFC>> {
        return this.repositorio.listarTFCs();
    }

  //-- TFC
  ListarTFCsDefendidos(): Observable<Array<TFC>> {
        return this.repositorio.ListarTFCsDefendidos();
    }

  //-- TFC
  ListarTFCsDisponiveisParaEstudante(): Observable<Array<TFC>> {
        return this.repositorio.ListarTFCsDisponiveisParaEstudante();
    }

  //-- TFC
  ListarTFCsDisponiveisParaProfessor(): Observable<Array<TFC>> {
        return this.repositorio.ListarTFCsDisponiveisParaProfessor();
    }

    //-- TFC
    TFCEstudante(id: number): Observable<Array<TFC>> {
          return this.repositorio.TFCEstudante(id);
      }
  
    //-- TFC
    TFCProfessor(id: number): Observable<Array<TFC>> {
          return this.repositorio.TFCProfessor(id);
      }

    procurarTFCPorId(codigo: number): Observable<TFC> {
        return this.repositorio.procurarTFCPorId(codigo);
    }
  
    salvarTFC(tfc: TFC): Observable<TFC> {
        return this.repositorio.salvarTFC(tfc);
    }
  
    actualizarTFC(id: number, tfc: TFC): Observable<TFC> {
        return this.repositorio.actualizarTFC(id, tfc);
    }
  
    eliminarTFC(id: number): Observable<TFC> {
        return this.repositorio.eliminarTFC(id);
    }

}
