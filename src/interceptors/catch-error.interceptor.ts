import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, pipe } from 'rxjs';
import { MessageService } from '../services/message.service';

export const catchErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      messageService.showError(`Ошибка: ${ error.status }`);
      return [];
    })
  );
};
