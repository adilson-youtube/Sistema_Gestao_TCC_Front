import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../modelo/entidades/notificacao';
import { NotificacaoRepositorio } from '../repositorios/notificacaorepositorio.service';
// import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  baseUrl: string;
  
  constructor(private repositorio: NotificacaoRepositorio) {
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

  //-- Message
  listarMessages(): Observable<Array<Message>> {
        return this.repositorio.listarMessages();
    }

    procurarMessagePorId(id: number): Observable<Message> {
        return this.repositorio.procurarMessagePorId(id);
    }
  
    enviarMessage(message: Message): Observable<Message> {
      return this.repositorio.enviarMessage(message);
    }
  
    actualizarMessage(id: number, message: Message): Observable<Message> {
        return this.repositorio.actualizarMessage(id, message);
    }
  
    eliminarMessage(id: number): Observable<Message> {
        return this.repositorio.eliminarMessage(id);
    }


}