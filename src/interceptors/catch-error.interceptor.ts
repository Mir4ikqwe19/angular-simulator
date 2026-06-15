import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, pipe, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

export const catchErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      if (error.status >= 500) {
        messageService.showError(`Ошибка: ${ error.status }`);
      }

      return throwError(() => error);
    })
  );
};
