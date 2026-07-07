import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IAuthUser } from '../interfaces/IAuthUser';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const currentUser: IAuthUser | null = authService.getProfile();

  if (currentUser) {
    return true;
  } else {
    router.createUrlTree(['/login']);
    return false;
  }
};
