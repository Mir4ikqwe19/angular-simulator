import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { UsersPageComponent } from '../users-page/users-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../home-page/home-page.component').then(component => component.HomePageComponent)
  },
  { 
    path: 'users', 
    loadComponent: () => import('../users-page/users-page.component').then(component => component.UsersPageComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('../not-found-page/not-found-page.component').then(component => component.NotFoundPageComponent)
  },
];
