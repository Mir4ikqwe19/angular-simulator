import { Component } from '@angular/core';
import './training' 
import { Color } from '../enums/Color';
import { Collection, numberCollection, stringCollection } from './collection';
import { IPropose } from '../interfaces/IPropose';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  isLoading: boolean = true;
  isBlockVisible: boolean = true;
  counter: number = 0;
  currentTime: string = '';
  readonly liveInputValue: string = '';
  readonly tourLocation: string = '';
  readonly dateTrip: string = '';
  readonly participants: string = '';
  readonly companyName: string = 'румтибет';

  readonly proposeDescription: IPropose[] = [
    {
      id: 1,
      iconName: 'people-icon',
      title: 'Опытный гид',
      definition: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      iconName: 'shield-icon',
      title: 'Безопасный поход',
      definition: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 3,
      iconName: 'loyal-price-icon',
      title: 'Лояльные цены',
      definition: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    }
  ]

  constructor() {
    this.saveLastLogin();
    this.setVisitCount();
    this.isPrimaryColor(Color.ORANGE);
    this.showDate();
    this.loadingPage();
  }

  private saveLastLogin(): void {
    const lastLog: string = new Date().toString();
    localStorage.setItem('last-login', lastLog);
  }

  private setVisitCount(): void {
    const LOGIN_KEY: string = 'login-count';
    const storedLoginCount: string = localStorage.getItem(LOGIN_KEY) || '0';

    let loginCount: number = JSON.parse(storedLoginCount) + 1;
    localStorage.setItem(LOGIN_KEY, loginCount.toString());
  }

  private isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
  }

  private updateCurrentTime(): void {
    this.currentTime = new Date().toLocaleString();
  }

  private showDate(): void {
    setInterval((): void => this.updateCurrentTime());
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  toggleBlock(): void {
    this.isBlockVisible = !this.isBlockVisible;
  }

  private loadingPage(): void {
    setTimeout((): void => {
      this.isLoading = false;
    }, 3000);
  }
  
}

stringCollection.replaceItem(0, 1, 'Мандарин');
stringCollection.deleteItem('Мандарин');
stringCollection.getAllItems();
numberCollection.deleteItem(1);