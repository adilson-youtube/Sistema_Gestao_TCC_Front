import { Component, OnInit } from '@angular/core';
import { RabbitMQService } from 'src/app/servicos/rabbit-mqservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  inputMessage: string = '';

  constructor(private rabbitMQService: RabbitMQService) {}

  ngOnInit() {
    // Substitua 'room1' pelo nome da fila correspondente à sala de chat
    // this.rabbitMQService.consumeMessages('chat', (message) => {
    //   this.messages.push(message);
    // });
  }

  sendMessage() {
    // Substitua 'room1' pelo nome da fila correspondente à sala de chat
    // this.rabbitMQService.sendMessage('chat', this.inputMessage);
    // this.inputMessage = '';
  }

}
