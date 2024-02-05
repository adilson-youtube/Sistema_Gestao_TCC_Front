import { Injectable } from '@angular/core';
import { ProprietariorepositorioService } from '../repositorios/proprietariorepositorio.service';
import { Observable } from 'rxjs';
import { Proprietario } from '../modelo/entidades/prorietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioservicoService {

  constructor(private repositorio: ProprietariorepositorioService) { }

  //-- Proprietario
    listarProprietarios(): Observable<Array<Proprietario>> {
        return this.repositorio.listarProprietarios();
    }

    procurarProprietarioPorId(codigo: number): Observable<Proprietario> {
        return this.repositorio.procurarProprietarioPorId(codigo);
    }
  
    salvarProprietario(proprietario: Proprietario): Observable<Proprietario> {
        return this.repositorio.salvarProprietario(proprietario);
    }
  
    procurarProprietarioPorCodigo(codigo: string): Observable<Proprietario> {
        return this.repositorio.procurarProprietarioPorCodigo(codigo);
    }
  
    actualizarProprietario(id: number, proprietario: Proprietario): Observable<Proprietario> {
        return this.repositorio.actualizarProprietario(id, proprietario);
    }
  
    eliminarProprietario(id: number): Observable<Proprietario> {
        return this.repositorio.eliminarProprietario(id);
    }



}
