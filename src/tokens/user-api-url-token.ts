import { InjectionToken } from '@angular/core';

export const USERS_API_URL: InjectionToken<string> = new InjectionToken<string>('https://jsonplaceholder.typicode.com/');