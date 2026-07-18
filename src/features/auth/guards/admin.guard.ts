import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IAuthUser } from '../interfaces/IAuthUser';
import { MessageService } from '../../../services/message.service';

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const messageService: MessageService = inject(MessageService);

  const user: IAuthUser | null = authService.getProfile();

  if (user?.role === 'admin') {
    return true;
  } else {
    messageService.showWarn('Вы не являетесь админом!');
    return router.createUrlTree(['/home']);
  }

};
