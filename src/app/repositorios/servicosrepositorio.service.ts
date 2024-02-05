import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exame } from '../modelo/entidades/exame';
import { Cirurgia } from '../modelo/entidades/cirurgia';
import { Consulta } from '../modelo/entidades/consulta';
import { Vacina } from '../modelo/entidades/vacina';
import { Servico } from '../modelo/entidades/servico';

@Injectable({
  providedIn: 'root'
})
export class ServicosrepositorioService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
  }

  //--- Servico
  listarServicos(): Observable<Array<Servico>> {
    const path = `Servico`;
    return this.http.get<Array<Servico>>(`${this.baseUrl}${path}`);
  }

  procurarServicoPorId(id: number): Observable<Servico> {
    const path = `Servico/${id}`;
    return this.http.get<Servico>(`${this.baseUrl}${path}`);
  }

  salvarServico(servico: Servico): Observable<Servico> {
    const path = `Servico`;
    return this.http.post<Servico>(`${this.baseUrl}${path}`, servico);
  }

  salvarServicoLista(servico: Array<Servico>): Observable<Array<Servico>> {
    const path = `Servico/AdicionarLista`;
    return this.http.post<Array<Servico>>(`${this.baseUrl}${path}`, servico);
  }

  actualizarServico(id: number, servico: Servico): Observable<Servico> {
    const path = `Servico/${id}`;
    return this.http.put<Servico>(`${this.baseUrl}${path}`, servico);
  }

  eliminarServico(id: number): Observable<Servico> {
    const path = `Servico/${id}`;
    return this.http.delete<Servico>(`${this.baseUrl}${path}`);
  }


  //--- Exame
  listarExames(): Observable<Array<Exame>> {
    const path = `Exame`;
    return this.http.get<Array<Exame>>(`${this.baseUrl}${path}`);
  }

  procurarExamePorId(id: number): Observable<Exame> {
    const path = `Exame/${id}`;
    return this.http.get<Exame>(`${this.baseUrl}${path}`);
  }

  salvarExame(exame: Servico): Observable<Exame> {
    const path = `Exame`;
    return this.http.post<Exame>(`${this.baseUrl}${path}`, exame);
  }

  actualizarExame(id: number, exame: Exame): Observable<Exame> {
    const path = `Exame/${id}`;
    return this.http.put<Exame>(`${this.baseUrl}${path}`, exame);
  }

  eliminarExame(id: number): Observable<Exame> {
    const path = `Exame/${id}`;
    return this.http.delete<Exame>(`${this.baseUrl}${path}`);
  }


  //--- Cirurgia
  listarCirurgias(): Observable<Array<Cirurgia>> {
    const path = `Cirurgia`;
    return this.http.get<Array<Cirurgia>>(`${this.baseUrl}${path}`);
  }

  procurarCirurgiaPorId(id: number): Observable<Cirurgia> {
    const path = `Cirurgia/${id}`;
    return this.http.get<Cirurgia>(`${this.baseUrl}${path}`);
  }

  salvarCirurgia(cirurgia: Servico): Observable<Cirurgia> {
    const path = `Cirurgia`;
    return this.http.post<Cirurgia>(`${this.baseUrl}${path}`, cirurgia);
  }

  actualizarCirurgia(id: number, cirurgia: Cirurgia): Observable<Cirurgia> {
    const path = `Cirurgia/${id}`;
    return this.http.put<Cirurgia>(`${this.baseUrl}${path}`, cirurgia);
  }

  eliminarCirurgia(id: number): Observable<Cirurgia> {
    const path = `Cirurgia/${id}`;
    return this.http.delete<Cirurgia>(`${this.baseUrl}${path}`);
  }


  //--- Consulta
  listarConsultas(): Observable<Array<Consulta>> {
    const path = `Consulta`;
    return this.http.get<Array<Consulta>>(`${this.baseUrl}${path}`);
  }

  procurarConsultaPorId(id: number): Observable<Consulta> {
    const path = `Consulta/${id}`;
    return this.http.get<Consulta>(`${this.baseUrl}${path}`);
  }

  salvarConsulta(consulta: Servico): Observable<Servico> {
    const path = `Consulta`;
    return this.http.post<Servico>(`${this.baseUrl}${path}`, consulta);
  }

  actualizarConsulta(id: number, consulta: Consulta): Observable<Consulta> {
    const path = `Consulta/${id}`;
    return this.http.put<Consulta>(`${this.baseUrl}${path}`, consulta);
  }

  eliminarConsulta(id: number): Observable<Consulta> {
    const path = `Consulta/${id}`;
    return this.http.delete<Consulta>(`${this.baseUrl}${path}`);
  }


  //--- Vacina
  listarVacinas(): Observable<Array<Vacina>> {
    const path = `Vacina`;
    return this.http.get<Array<Vacina>>(`${this.baseUrl}${path}`);
  }

  procurarVacinaPorId(id: number): Observable<Vacina> {
    const path = `Vacina/${id}`;
    return this.http.get<Vacina>(`${this.baseUrl}${path}`);
  }

  salvarVacina(vacina: Servico): Observable<Vacina> {
    const path = `Vacina`;
    return this.http.post<Vacina>(`${this.baseUrl}${path}`, vacina);
  }

  actualizarVacina(id: number, vacina: Vacina): Observable<Vacina> {
    const path = `Vacina/${id}`;
    return this.http.put<Vacina>(`${this.baseUrl}${path}`, vacina);
  }

  eliminarVacina(id: number): Observable<Vacina> {
    const path = `Vacina/${id}`;
    return this.http.delete<Vacina>(`${this.baseUrl}${path}`);
  }


}
