import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { definePreset, palette, updatePrimaryPalette } from '@primeuix/themes';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara'
import Nora from '@primeuix/themes/nora'
import Material from '@primeuix/themes/material'
import { LaraBaseDesignTokens } from '@primeuix/themes/lara/base';
import { Preset } from '@primeuix/themes/types';
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { NoraBaseDesignTokens } from '@primeuix/themes/nora/base';
import { AppThemes } from '../enums/Theme';

function getTheme(): Preset {
  const savedTheme: AppThemes | null = localStorage.getItem('app-theme') as AppThemes;

  if (!savedTheme) {
    return Lara
  }

  const currentTheme: string = JSON.parse(savedTheme);
  switch(currentTheme) {
    case 'Aura':
      return Aura;
    case 'Nora':
      return Nora;
    default:
      return Lara
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.my-app-dark',
          ripple: true,
        }
      },
    })
  ]
};
