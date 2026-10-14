import { Routes } from '@angular/router';
import { postResolver } from '../features/posts/resolvers/post.resolver';
import { authGuard } from '../features/auth/guards/auth.guard';
import { adminGuard } from '../features/auth/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./main-layout/main-layout.component').then((m) => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home-page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('../users-page/users-page.component').then((m) => m.UsersPageComponent),
        canActivate: [adminGuard],
      },
      {
        path: 'posts',
        canActivate: [adminGuard],
        children: [
          {
            path: 'create',
            loadComponent: () =>
              import('../features/posts/posts-create/posts-create.component').then(
                (m) => m.PostsCreateComponent,
              ),
          },
          {
            path: 'post/:id',
            loadComponent: () =>
              import('../features/posts/posts-details/posts-details.component').then(
                (m) => m.PostsDetailsComponent,
              ),
            resolve: {
              post: postResolver,
            },
          },
          {
            path: '',
            loadComponent: () =>
              import('../features/posts/posts/posts.component').then((m) => m.PostsComponent),
          },
        ],
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../not-found-page/not-found-page.component').then(
        (component) => component.NotFoundPageComponent,
      ),
  },
];
