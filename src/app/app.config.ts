import { ApplicationConfig, inject, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
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
import { AppTheme } from '../enums/Theme';

function getTheme(): Preset {
  const savedTheme: AppTheme | null = localStorage.getItem('app-theme') as AppTheme;

  if (!savedTheme) {
    return Lara;
  }

  switch(savedTheme) {
    case AppTheme.AURA:
      return Aura;
    case AppTheme.NORA:
      return Nora;
    default:
      return Lara
  }
}
import { provideHttpClient } from '@angular/common/http';

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
    }),
    provideHttpClient()
  ]
};
