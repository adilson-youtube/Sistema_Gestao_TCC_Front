import { Injectable } from '@angular/core';
import { MarcacaorepositorioService } from '../repositorios/marcacaorepositorio.service';
import { Observable } from 'rxjs';
import { Marcacao } from '../modelo/entidades/marcacao';

@Injectable({
  providedIn: 'root'
})
export class MarcacaoservicoService {

  constructor(private repositorio: MarcacaorepositorioService) { }

  //-- Marcacao
  listarMarcacoes(): Observable<Array<Marcacao>> {
        return this.repositorio.listarMarcacoes();
    }

    procurarMarcacaoPorId(codigo: number): Observable<Marcacao> {
        return this.repositorio.procurarMarcacaoPorId(codigo);
    }
  
    salvarMarcacao(marcacao: Marcacao): Observable<Marcacao> {
        return this.repositorio.salvarMarcacao(marcacao);
    }
  
    actualizarMarcacao(id: number, marcacao: Marcacao): Observable<Marcacao> {
        return this.repositorio.actualizarMarcacao(id, marcacao);
    }
  
    eliminarMarcacao(id: number): Observable<Marcacao> {
        return this.repositorio.eliminarMarcacao(id);
    }


}
