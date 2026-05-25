import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const start: number = performance.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event instanceof HttpResponse) {
        const duration: number = performance.now() - start;
        console.log('request:', { httpMethod: req.method, url: req.url, responseStatus: event.status, responseTime: duration });
      }
    })
  );
};
