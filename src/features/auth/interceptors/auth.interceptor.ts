import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { catchError, retry, switchMap, tap, throwError } from 'rxjs';
import { LocalStorageService } from '../../../services/local-storage.service';
import { AuthApiService } from '../services/auth-api.service';
import { IToken } from '../interfaces/IToken';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const authService: AuthService = inject(AuthService);

  const tokens: IToken | null = localStorageService.getValue<IToken>('tokens');
  const accessToken: string | undefined = tokens?.accessToken;

  function addAuthHeader(token: string): HttpRequest<unknown> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`,
      },
    });
  }

  if (accessToken) {
    return next(addAuthHeader(accessToken)).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((response: IToken) => {
              return next(addAuthHeader(response.accessToken));
            }),
            catchError((err: unknown) => {
              authService.logout();
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
