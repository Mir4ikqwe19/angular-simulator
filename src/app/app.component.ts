import { Component } from '@angular/core';
import './training' 
import { Color } from '../enums/Color';
import { Collection, numberCollection, stringCollection } from './collection';
import { IProgramItem } from '../interfaces/IProgram';
import { FormsModule } from '@angular/forms';
import { widgetMode } from '../types/WidgetMode';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  isLoading: boolean = true;
  widgetContent: widgetMode = 'timer';
  counter: number = 0;
  currentDateTime: string = '';
  liveInputValue: string = '';
  tourLocation: string = '';
  dateTrip: string = '';
  participants: string = '';
  readonly companyName: string = 'румтибет';

  readonly programBlockItems: IProgramItem[] = [
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
    this.initPage();

    setInterval(() => {
      this.currentDateTime = new Date().toLocaleString();
    })
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  switchWidgetMode(): void {
    this.widgetContent = this.widgetContent === 'counter' ? 'timer' : 'counter';
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

  private initPage(): void {
    setTimeout((): void => {
      this.isLoading = false;
    }, 3000);
  }
  
}

stringCollection.replaceItem(0, 1, 'Мандарин');
stringCollection.deleteItem('Мандарин');
stringCollection.getAllItems();
numberCollection.deleteItem(1);