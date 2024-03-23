import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notificacao } from '../modelo/entidades/notificacao';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  baseUrl: string;
  
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.predefinidaUrl}`;

   }

  getNotifications(): Observable<Message> {
    return new Observable<Message>((observer) => {
      const path = `notification`;
      const eventSource = new EventSource(`${this.baseUrl}${path}`);

      eventSource.onmessage = (event) => {
        const notification: Message = JSON.parse(event.data);
        observer.next(notification);
      };

      eventSource.onerror = (error) => {
        console.error('Erro no EventSource:', error);
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}