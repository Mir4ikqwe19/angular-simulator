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

  constructor() {
    this.saveLastLogin();
    this.setVisitCount();
    this.isPrimaryColor(Color.ORANGE);
  }

  companyName: string = 'румтибет';

  saveLastLogin(): void {
    const lastLog: string = new Date().toString();
    localStorage.setItem('last-login', lastLog);
  }

  setVisitCount(): void {
    const loginKey = 'login-count';
    const storedLoginCount: string | null = localStorage.getItem(loginKey) || '0';

    let loginCount = JSON.parse(storedLoginCount) + 1;
    localStorage.setItem(loginKey, loginCount.toString());
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