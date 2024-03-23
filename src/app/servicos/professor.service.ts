import { Injectable } from '@angular/core';
import { ProfessorRepositorio } from '../repositorios/professorrepositorio.service';
import { Professor } from '../modelo/entidades/professor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private repositorio: ProfessorRepositorio) { }

  //-- Professor
  listarProfessores(): Observable<Array<Professor>> {
        return this.repositorio.listarProfessores();
    }

    procurarProfessorPorId(codigo: number): Observable<Professor> {
        return this.repositorio.procurarProfessorPorId(codigo);
    }
  
    salvarProfessor(professor: Professor): Observable<Professor> {
        return this.repositorio.salvarProfessor(professor);
    }
  
    actualizarProfessor(id: number, professor: Professor): Observable<Professor> {
        return this.repositorio.actualizarProfessor(id, professor);
    }
  
    eliminarProfessor(id: number): Observable<Professor> {
        return this.repositorio.eliminarProfessor(id);
    }

}
