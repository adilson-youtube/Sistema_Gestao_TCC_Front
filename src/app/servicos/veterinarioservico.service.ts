import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietario } from '../modelo/entidades/prorietario';
import { VeterinariorepositorioService } from '../repositorios/veterinariorepositorio.service';
import { Veterinario } from '../modelo/entidades/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioservicoService {

  constructor(private repositorio: VeterinariorepositorioService) { }

  //-- Órgão
  listarVeterinarios(): Observable<Array<Veterinario>> {
        return this.repositorio.listarVeterinarios();
    }
  
    salvarVeterinario(veterinario: Veterinario): Observable<Veterinario> {
        return this.repositorio.salvarVeterinario(veterinario);
    }
  
  //-- Área
  procurarVeterinarioPorId(id: number): Observable<Veterinario> {
        return this.repositorio.procurarVeterinarioPorId(id);
    }
  
    procurarVeterinarioPorCodigo(codigo: string): Observable<Veterinario> {
        return this.repositorio.procurarVeterinarioPorCodigo(codigo);
    }


}
