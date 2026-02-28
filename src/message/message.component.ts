import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet,],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  notificationService: NotificationService = inject(NotificationService);
  
}
