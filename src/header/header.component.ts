import { Component, inject } from '@angular/core';
import { widgetMode } from '../types/WidgetMode';
import { MessageService } from '../services/message.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { INavigation } from '../interfaces/INavigation';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AsyncPipe, NgClass } from '@angular/common';
import { LocalStorageService } from '../services/local-storage.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { usePreset } from '@primeuix/themes';
import { ThemeService } from '../services/theme.service';
import { faMoon, faSun, IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { AppTheme } from '../enums/Theme';
import { ITheme } from '../interfaces/ITheme';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../features/auth/services/auth.service';
import { IAuthUser } from '../features/auth/interfaces/IAuthUser';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    SelectButtonModule,
    FaIconComponent,
    AsyncPipe,
    ToggleSwitchModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  messageService: MessageService = inject(MessageService);
  themeService: ThemeService = inject(ThemeService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private loaderService: LoaderService = inject(LoaderService);
  private authService: AuthService = inject(AuthService);
  authUser$: Observable<IAuthUser | null> = this.authService.authUser$;

  companyName: string = 'румтибет';
  counter: number = 0;
  currentDateTime: string = new Date().toLocaleString();
  currentWidget!: widgetMode;
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;

  navigationItems: INavigation[] = [
    {
      id: 1,
      text: 'Главная',
      path: 'home',
    },
    {
      id: 2,
      text: 'Пользователи',
      path: 'users',
    },
    {
      id: 3,
      text: 'Посты',
      path: 'posts',
    },
  ];

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

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  onButtonClick(theme: AppTheme): void {
    this.themeService.changeTheme(theme);
  }

  toLoginPage(): void {
    this.router.navigate(['login']);
  }

  toLogOut(): void {
    this.authService.logout();
  }

}
