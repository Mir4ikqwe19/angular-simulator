import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  messageList: IMessage[] = [];

  addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messageList = [newMessage, ...this.messageList];

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  closeMessage(currentMessage: IMessage): void {
    this.messageList = this.messageList.filter((message: IMessage): boolean => message !== currentMessage);
  }

}
