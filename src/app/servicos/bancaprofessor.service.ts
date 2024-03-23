import { Injectable } from '@angular/core';
import { BancaProfessorRepositorio } from '../repositorios/bancaprofessorrepositorio.service';
import { BancaProfessor } from '../modelo/entidades/bancaprofessor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BancaProfessorService {

  constructor(private repositorio: BancaProfessorRepositorio) { }

  //-- BancaProfessor
  listarBancasProfessores(): Observable<Array<BancaProfessor>> {
        return this.repositorio.listarBancasProfessores();
    }

    procurarBancaProfessorPorId(codigo: number): Observable<BancaProfessor> {
        return this.repositorio.procurarBancaProfessorPorId(codigo);
    }
  
    salvarBancaProfessor(bancaProfessor: BancaProfessor): Observable<BancaProfessor> {
        return this.repositorio.salvarBancaProfessor(bancaProfessor);
    }
  
    actualizarBancaProfessor(id: number, bancaProfessor: BancaProfessor): Observable<BancaProfessor> {
        return this.repositorio.actualizarBancaProfessor(id, bancaProfessor);
    }
  
    eliminarBancaProfessor(id: number): Observable<BancaProfessor> {
        return this.repositorio.eliminarBancaProfessor(id);
    }

}
