import { Component } from '@angular/core';
import './training' 
import { Color } from '../enums/Color';
import { Collection, numberCollection, stringCollection } from './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  companyName: string = 'румтибет';

  constructor() {
    this.saveLastLogin();
    this.setVisitCount();
    this.isPrimaryColor(Color.ORANGE);
  }

  saveLastLogin(): void {
    const lastLog: string = new Date().toString();
    localStorage.setItem('last-login', lastLog);
  }

  setVisitCount(): void {
    const LOGIN_KEY: string = 'login-count';
    const storedLoginCount: string = localStorage.getItem(LOGIN_KEY) || '0';

    let loginCount: number = JSON.parse(storedLoginCount) + 1;
    localStorage.setItem(LOGIN_KEY, loginCount.toString());
  }

  isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
  }

}

stringCollection.replaceItem(0, 1, 'Мандарин');
stringCollection.deleteItem('Мандарин');
stringCollection.getAllItems();
numberCollection.deleteItem(1);