import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  
  messageArr: IMessage[] = [];

  addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = {type, text};
    const updatedMessageArr: IMessage[] = [newMessage, ...this.messageArr];
    this.messageArr = updatedMessageArr;

    setTimeout((): void => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  closeMessage(currentMessage: IMessage): void {
    if (this.messageArr.includes(currentMessage)) {
      this.messageArr = this.messageArr.filter((message: IMessage): boolean => message !== currentMessage);
    }
  }

}
