import { Injectable } from '@angular/core';
import { PropostaRepositorio } from '../repositorios/propostarepositorio.service';
import { Proposta } from '../modelo/entidades/proposta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(private repositorio: PropostaRepositorio) { }

  //-- Proposta
  listarPropostas(): Observable<Array<Proposta>> {
        return this.repositorio.listarPropostas();
    }

    procurarPropostaPorId(codigo: number): Observable<Proposta> {
        return this.repositorio.procurarPropostaPorId(codigo);
    }
  
    salvarProposta(proposta: Proposta): Observable<Proposta> {
        return this.repositorio.salvarProposta(proposta);
    }
  
    actualizarProposta(id: number, proposta: Proposta): Observable<Proposta> {
        return this.repositorio.actualizarProposta(id, proposta);
    }
  
    eliminarProposta(id: number): Observable<Proposta> {
        return this.repositorio.eliminarProposta(id);
    }

}
