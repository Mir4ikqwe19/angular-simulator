import { Component, inject } from '@angular/core';
import { IProgramItem } from '../interfaces/IProgram';
import { IDestinationItem } from '../interfaces/IDestinations';
import { IBlogItem } from '../interfaces/IBlog';
import { Color } from '../enums/Color';
import { LocalStorageService } from '../services/local-storage.service';
import { numberCollection, stringCollection } from '../app/collection';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  notificationService: NotificationService = inject(NotificationService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  isLoading: boolean = true;
  liveInputValue!: string;
  tourLocation!: string;
  dateTrip!: string;
  participants!: string;

  readonly programBlocks: IProgramItem[] = [
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
  ];

  destinationBlock: IDestinationItem[] = [
    {
      id: 1,
      imageName: 'lake-near-mountains',
      iconName: 'star-icon',
      assessment: '4.9',
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480
    },
    {
      id: 2,
      imageName: 'night-in-mountains',
      iconName: 'star-icon',
      assessment: '4.5',
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500
    },
    {
      id: 3,
      imageName: 'yoga-in-mountains',
      iconName: 'star-icon',
      assessment: '5.0',
      title: 'Йога в горах',
      description: 'для тех, кто забоится о себе',
      price: 230
    }
  ];

  travelBlog: IBlogItem[] = [
    {
      id: 1,
      image: 'italy',
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023'
    },
    {
      id: 2,
      image: 'aircraft-porthole',
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ...',
      date: '01/04/2023'
    },
    {
      id: 3,
      image: 'woman-in-alley',
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023'
    },
    {
      id: 4,
      image: 'india',
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023'
    }
  ];

  constructor() {
    this.saveLastLogin();
    this.setVisitCount();
    this.isPrimaryColor(Color.ORANGE);
  }

  private saveLastLogin(): void {
    const LAST_LOGIN_KEY: string = 'last-login';
    const lastLog: string = new Date().toString();
    this.localStorageService.setValue(LAST_LOGIN_KEY, lastLog);
  }

  private setVisitCount(): void {
    const LOGIN_COUNT_KEY: string = 'login-count';
    const storedLoginCount: string = this.localStorageService.getValue(LOGIN_COUNT_KEY) || '0';

    let loginCount: number = JSON.parse(storedLoginCount) + 1;
    this.localStorageService.setValue(LOGIN_COUNT_KEY, loginCount);
  }

  private isPrimaryColor(color: Color): boolean {
    const mainColors: Color[] = [Color.RED, Color.BLUE, Color.GREEN];
    return mainColors.includes(color);
  }

}

stringCollection.replaceItem(0, 1, 'Мандарин');
stringCollection.deleteItem('Мандарин');
stringCollection.getAllItems();
numberCollection.deleteItem(1);