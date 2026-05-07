import { inject, Injectable, OnInit } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset, updatePreset, updatePrimaryPalette } from '@primeuix/themes';
import { AppTheme } from '../enums/Theme';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara'
import Nora from '@primeuix/themes/nora'
import { ITheme } from '../interfaces/ITheme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private isDarkModeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.initDarkMode());
  isDarkMode$: Observable<boolean> = this.isDarkModeSubject.asObservable()
    .pipe(
      tap((isDarkMode: boolean) => {
        isDarkMode ? this.element!.classList.add('my-app-dark') : this.element!.classList.remove('my-app-dark');
      })
    );

  private themeSubject: BehaviorSubject<AppTheme> = new BehaviorSubject<AppTheme>(this.initAppTheme());
  theme$: Observable<AppTheme>= this.themeSubject.asObservable()
    .pipe(
      tap((theme: AppTheme) => this.changeTheme(theme))
    );
  
  private APP_MODE_KEY: string = 'app-mode';
  private APP_THEME_KEY: string = 'app-theme';
  private element: HTMLElement | null = document.querySelector('html');
  themeOptions: ITheme[] = [
    { name: 'Lara', theme: AppTheme.LARA },
    { name: 'Aura', theme: AppTheme.AURA },
    { name: 'Nora', theme: AppTheme.NORA }
  ];

  private initDarkMode(): boolean {
    return this.localStorageService.getValue('app-mode') ?? false;
  }

  private initAppTheme(): AppTheme {
    const savedTheme: AppTheme | null = this.localStorageService.getValue<AppTheme>('app-theme');
    return savedTheme ?? AppTheme.LARA;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkModeSubject.next(isDarkMode);
    this.localStorageService.setValue(this.APP_MODE_KEY, isDarkMode);
  }

  changeTheme(theme: AppTheme): void {
    switch(theme) {
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
    
    this.localStorageService.setValue(this.APP_THEME_KEY, theme);
  }

}
