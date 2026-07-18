import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { Preset } from '@primeuix/themes/types';
import { AppTheme } from '../enums/Theme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from '../interceptors/logging.interceptor';
import { catchErrorInterceptor } from '../interceptors/catch-error.interceptor';
import { authInterceptor } from '../features/auth/interceptors/auth.interceptor';
import { AuthService } from '../features/auth/services/auth.service';
import { IAuthUser } from '../features/auth/interfaces/IAuthUser';
import { Observable } from 'rxjs';

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
      return Lara;
  }
}

export function initializeApp(authService: AuthService): () => Observable<IAuthUser | null> {
  return () => authService.initAuth();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([loggingInterceptor, catchErrorInterceptor, authInterceptor])),
    providePrimeNG({
      theme: {
        preset: getTheme(),
        options: {
          darkModeSelector: '.my-app-dark',
          ripple: true,
        }
      },
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService],
      multi: true
    }
  ]
};
