import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const token: boolean = authService.isAuthenticated();

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
