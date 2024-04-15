
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/modelo/entidades/notificacao';
import { NotificacaoService } from 'src/app/servicos/notificacao.service';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  subscription: Subscription;
  notificacao: Message;
  notificacoes = new Array<Message>();
  quantNotificacoes = 0;

  constructor(private notificationService: NotificacaoService) {
    this.subscription = this.notificationService.getNotifications().subscribe(
      (notification) => {
        console.log("Entrou no serviço de Notificações!"+ JSON.stringify(notification));
        console.log("O Objecto enviado é "+ notification);
        // let no = JSON.parse(notification);
        // this.notifications.push(notification);
        this.notificacoes.push(notification);
        this.quantNotificacoes += 1;
      },
      (error) => {
        console.error('Erro ao receber notificação:', error);
      }
    );
  }

  ngOnInit(): void {
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
