import { Component } from '@angular/core';
import './training' 
import { Colors } from '../enums/Color';
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
    this.updateLoginCount();
    this.isMainColors(Colors.ORANGE);
  }

  companyName: string = 'румтибет';
  mainColors: Colors[] = [Colors.RED, Colors.BLUE, Colors.GREEN];

  saveLastLogin(): void {
    const lastLog: string = new Date().toString();
    localStorage.setItem('last-login-date', lastLog);
  }

  updateLoginCount(): void {
    const localStorageResult: string | null = localStorage.getItem('login-count');
    let loginCount: number;

    if (localStorageResult === null) {
      loginCount = 1;
    } else {
      loginCount = JSON.parse(localStorageResult);
      loginCount++
    }
    
    const loginCountResult: string = loginCount.toString();
    localStorage.setItem('login-count', loginCountResult);
  }

  isMainColors(color: Colors):boolean {
    return this.mainColors.includes(color);
  }
}

stringCollection.replaceItem(0, 1, 'Мандарин');
numberCollection.deleteItem(1);