import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MessageService } from '../services/message.service';
import {
  faEnvelope,
  faMessage,
  IconDefinition,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FaIconComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);

  faEnvelope: IconDefinition = faEnvelope;
  faMessage: IconDefinition = faMessage;
  faCloseMark: IconDefinition = faCircleXmark;

}
