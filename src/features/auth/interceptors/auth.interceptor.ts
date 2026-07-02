import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../services/auth-api.service';
import { IAuthResponse } from '../interfaces/IAuthResponse';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const authApiService: AuthApiService = inject(AuthApiService);
  const authService: AuthService = inject(AuthService);

  const tokens: IAuthResponse = localStorageService.getValue<IAuthResponse>('tokens')!;
  const accessToken: string = tokens?.accessToken;

  if (accessToken) {
    const authRequest: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ accessToken }`,
      },
    });

    return next(authRequest).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((response) => {
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${ response.accessToken }`,
                },
              });

              return next(newRequest);
            }),
            catchError((err) => {
              authService.logOut();
              return throwError(() => err);
            }),
          );
        }
        return throwError((err: HttpErrorResponse) => err);
      }),
    );
  } else {
    return next(req);
  }
};
