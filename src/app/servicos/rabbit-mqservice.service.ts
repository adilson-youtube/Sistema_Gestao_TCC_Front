import { Injectable } from '@angular/core';
// import * as Amqp from 'amqp-ts';

@Injectable({
  providedIn: 'root'
})
export class RabbitMQService {
  // private connection: Amqp.Connection;
  // private queue: Amqp.Queue;

  // constructor() {
  //   this.connection = new Amqp.Connection('amqp://guest:guest@localhost');
  // }

  // // Método para enviar uma mensagem para uma fila específica
  // sendMessage(queueName: string, message: string) {
  //   const queue = this.connection.declareQueue(queueName);
  //   const messageSend  = new Amqp.Message(message);
  //   queue.send(messageSend);
  // }

  // // Método para consumir mensagens de uma fila específica
  // consumeMessages(queueName: string, callback: (message: any) => void) {
  //   const queue = this.connection.declareQueue(queueName);
  //   queue.activateConsumer((message) => {
  //     callback(message.getContent());
  //   });
  // }
}
