import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  messageList: IMessage[] = [];

  private addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messageList = [newMessage, ...this.messageList];

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  showWarn(text: string): void {
    const warn: MessageType.WARN = MessageType.WARN;
    this.addMessage(warn, text);
  }

  showError(text: string): void {
    const error: MessageType.ERROR = MessageType.ERROR;
    this.addMessage(error, text);
  }

  showSucces(text: string) {
    const succes: MessageType.SUCCESS = MessageType.SUCCESS;
    this.addMessage(succes, text);
  }

  showInfo(text: string) {
    const info: MessageType.INFO = MessageType.INFO;
    this.addMessage(info, text);
  }

  closeMessage(currentMessage: IMessage): void {
    this.messageList = this.messageList.filter((message: IMessage): boolean => message !== currentMessage);
  }

}
