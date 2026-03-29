import { Injectable } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/Message';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  
  messageList: IMessage[] = [];

  private messagesSubject: BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  messages$: Observable<IMessage[]> = this.messagesSubject.asObservable();

  private addMessage(type: MessageType, text: string): void {
    const newMessage: IMessage = { type, text };
    this.messagesSubject.next([newMessage, ...this.messagesSubject.getValue()]);

    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

  showWarn(text: string): void {
    this.addMessage(MessageType.WARN, text);
  }

  showError(text: string): void {
    this.addMessage(MessageType.ERROR, text);
  }

  showSucces(text: string): void {
    this.addMessage(MessageType.SUCCESS, text);
  }

  showInfo(text: string): void {
    this.addMessage(MessageType.INFO, text);
  }

  closeMessage(currentMessage: IMessage): void {
    const filteredMessages: IMessage[] = this.messagesSubject.getValue().filter((message: IMessage) => message !== currentMessage);
    this.messagesSubject.next(filteredMessages);
  }

}
