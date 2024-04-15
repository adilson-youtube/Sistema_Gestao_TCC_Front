import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../modelo/entidades/notificacao';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoRepositorio {
  baseUrl: string;
  httpOptions: HttpHeaders = new HttpHeaders() 
  // .set('Content-Type', 'application/json') 
  // .set('Access-Control-Allow-Credentials', '*/*') 
  // .set('Accept', '*/*') 
  .set('Authorization', 'Bearer ' + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;
    // console.log("Cabeçario da Requisição: "+JSON.stringify(this.httpOptions))
  }

  //--- Marcacão
  listarMessages(): Observable<Array<Message>> {
    const path = `Notification`;
    // return this.http.get<Array<Message>>(`${this.baseUrl}${path}`,  {headers: this.httpOptions, withCredentials: true});
    return this.http.get<Array<Message>>(`${this.baseUrl}${path}`);
  }

  procurarMessagePorId(id: number): Observable<Message> {
    const path = `Notification/${id}`;
    return this.http.get<Message>(`${this.baseUrl}${path}`);
  }

  enviarMessage(message: Message): Observable<Message> {
    const path = `Notification`;
    return this.http.post<Message>(`${this.baseUrl}${path}`, message);
  }

  actualizarMessage(id: number, message: Message): Observable<Message> {
    const path = `Notification/${id}`;
    return this.http.put<Message>(`${this.baseUrl}${path}`, message);
  }

  eliminarMessage(id: number): Observable<Message> {
    const path = `Notification/${id}`;
    return this.http.delete<Message>(`${this.baseUrl}${path}`);
  }


}
