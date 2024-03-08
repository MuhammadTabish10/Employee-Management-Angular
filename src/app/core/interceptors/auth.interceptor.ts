import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader();
  const token = localStorage.getItem('token');
  if (token && !req.url.includes('/login')) { // Skip adding token for login request
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return next(authReq).pipe(finalize(() => loaderService.hideLoader()));
  }
  return next(req).pipe(finalize(() => loaderService.hideLoader()));
}