import { Component, inject } from '@angular/core';
import { widgetMode } from '../types/WidgetMode';
import { NotificationService } from '../services/notification.service';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { INavigation } from '../interfaces/INavigation';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  notificationService: NotificationService = inject(NotificationService);

  companyName: string = 'румтибет';
  counter: number = 0;
  currentDateTime: string = new Date().toLocaleString();
  currentWidget!: widgetMode;

  navigationItems: INavigation[] =[
    {
      id: 1,
      text: 'Главная',
      path: ''
    },
    {
      id: 2,
      text: 'Пользователи',
      path: 'users'
    }
  ]

  constructor() {
    setInterval(() => {
      this.currentDateTime = new Date().toLocaleString();
    }, 1000);
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  switchWidgetMode(widgetMode: widgetMode): void {
    this.currentWidget = widgetMode;
  }

}
