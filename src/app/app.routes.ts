import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { UsersPageComponent } from '../users-page/users-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { PostsComponent } from '../features/posts/posts/posts.component';
import { PostsCreateComponent } from '../features/posts/posts-create/posts-create.component';
import { PostsDetailsComponent } from '../features/posts/posts-details/posts-details.component';
import { PostsEditDialogComponent } from '../features/posts/posts-edit-dialog/posts-edit-dialog.component';
import { postResolver } from '../features/posts/post.resolver';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../home-page/home-page.component').then(m => m.HomePageComponent)
  },
  { 
    path: 'users', 
    loadComponent: () => import('../users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  { 
    path: 'posts', 
    children: [
      {
        path: 'create',
        loadComponent: () => import('../features/posts/posts-create/posts-create.component').then(m => m.PostsCreateComponent)
      },
      {
        path: 'edit',
        loadComponent: () => import('../features/posts/posts-edit-dialog/posts-edit-dialog.component').then(m => m.PostsEditDialogComponent)
      },
      {
        path: 'post/:id',
        loadComponent: () => import('../features/posts/posts-details/posts-details.component').then(m => m.PostsDetailsComponent),
        resolve: {
          post: postResolver
        },
      },
      {
        path: '',
        loadComponent: () => import('../features/posts/posts/posts.component').then(m => m.PostsComponent),
      }
    ]
  },
  { 
    path: '**', 
    loadComponent: () => import('../not-found-page/not-found-page.component').then(component => component.NotFoundPageComponent)
  },
];
