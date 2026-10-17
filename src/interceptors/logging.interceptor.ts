import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { filter, tap } from 'rxjs';
import { APP_CONFIG } from '../tokens/app-config.token';
import { IAppConfig } from '../interfaces/IAppconfig';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const start: number = performance.now();
  const appConfig: IAppConfig = inject(APP_CONFIG);

  return next(req).pipe(
    filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
    tap((event: HttpResponse<unknown>) => {
      const duration = performance.now() - start;

      if (appConfig.enableLogs) {
        console.log('request:', {
          httpMethod: req.method,
          url: req.url,
          responseStatus: event.status,
          responseTime: duration,
        });
      }
    }),
  );
};
