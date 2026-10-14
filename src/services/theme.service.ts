import { inject, Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset, updatePreset, updatePrimaryPalette } from '@primeuix/themes';
import { AppTheme } from '../enums/Theme';
import { APP_CONFIG } from '../tokens/app-config.token';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { ITheme } from '../interfaces/ITheme';
import { IAppConfig } from '../interfaces/IApp-config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  appConfig: IAppConfig = inject(APP_CONFIG);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.initDarkMode(),
  );

  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      if (isDarkMode) {
        this.element!.classList.add('my-app-dark');
      } else {
        this.element!.classList.remove('my-app-dark');
      }
    }),
  );

  private themeSubject: BehaviorSubject<AppTheme> = new BehaviorSubject<AppTheme>(
    this.initAppTheme(),
  );

  theme$: Observable<AppTheme> = this.themeSubject
    .asObservable()
    .pipe(tap((theme: AppTheme) => this.changeTheme(theme)));

  private APP_MODE_KEY: string = 'app-mode';
  private APP_THEME_KEY: string = 'app-theme';
  private element: HTMLElement | null = document.querySelector('html');
  themeOptions: ITheme[] = [
    { name: 'Lara', theme: AppTheme.LARA },
    { name: 'Aura', theme: AppTheme.AURA },
    { name: 'Nora', theme: AppTheme.NORA },
  ];

  private initDarkMode(): boolean {
    if (!this.appConfig.enableTheming) {
      return false;
    }

    return this.localStorageService.getValue('app-mode') ?? false;
  }

  private initAppTheme(): AppTheme {
    const savedTheme: AppTheme | null =
      this.localStorageService.getValue<AppTheme>('app-theme');

    return savedTheme ?? AppTheme.LARA;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    if (!this.appConfig.enableTheming) {
      return;
    }
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setValue(this.APP_MODE_KEY, isDarkMode);
  }

  changeTheme(theme: AppTheme): void {
    if (!this.appConfig.enableTheming && theme !== AppTheme.LARA) {
      theme = AppTheme.LARA;
    }
    
    switch (theme) {
      case AppTheme.LARA:
        usePreset(Lara);
        break;
      case AppTheme.AURA:
        usePreset(Aura);
        break;
      case AppTheme.NORA:
        usePreset(Nora);
        break;
    }

    if (this.appConfig.enableTheming) {
      this.localStorageService.setValue(this.APP_THEME_KEY, theme);
    }
  }

}
