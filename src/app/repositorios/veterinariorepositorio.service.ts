import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Veterinario } from '../modelo/entidades/veterinario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinariorepositorioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
      this.baseUrl = `${environment.predefinidaUrl}`;
  }


//--- candidato -----
  listarVeterinarios(): Observable<Array<Veterinario>> {
      const path = `Veterinario`;
      return this.http.get<Array<Veterinario>>(`${this.baseUrl}${path}`);
  }

  salvarVeterinario(veterinario: Veterinario): Observable<Veterinario> {
      const path = `Veterinario`;
      return this.http.post<Veterinario>(`${this.baseUrl}${path}`, veterinario);
  }

  procurarVeterinarioPorId(codigo: number): Observable<Veterinario> {
      const path = `Veterinario/${codigo}`;
      return this.http.get<Veterinario>(`${this.baseUrl}${path}`);
  }

  procurarVeterinarioPorCodigo(codigo: string): Observable<Veterinario> {
      const path = `Veterinario/${codigo}`;
      return this.http.get<Veterinario>(`${this.baseUrl}${path}`);
  }

//------
}
