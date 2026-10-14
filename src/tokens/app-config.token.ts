import { InjectionToken } from '@angular/core';
import { IAppConfig } from '../interfaces/IApp-config';

export const APP_CONFIG = new InjectionToken<IAppConfig>('APP_CONFIG');
